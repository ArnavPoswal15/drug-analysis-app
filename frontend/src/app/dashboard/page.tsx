'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTopDrugs, useConditions } from '@/hooks/use-api';
import { RefreshButton } from '@/components/ui/refresh-button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import './dashboard.css';

export default function Dashboard() {
  const [selectedCondition, setSelectedCondition] = useState('');
  
  // Use cached data fetching hooks
  const { data: topDrugsData, isLoading: topDrugsLoading, error: topDrugsError } = useTopDrugs(selectedCondition);
  const { data: conditionsData, isLoading: conditionsLoading, error: conditionsError } = useConditions();
  
  // Safely extract data with fallbacks
  const topDrugs = Array.isArray(topDrugsData) ? topDrugsData : [];
  const conditions = Array.isArray(conditionsData) ? conditionsData : [];
  
  // Loading state
  const loading = topDrugsLoading || conditionsLoading;
  
  // Error handling
  const hasError = topDrugsError || conditionsError;
  
  const totalReviews = conditions.reduce((sum, cond) => sum + cond.count, 0);
  const averageRating =
    topDrugs.length > 0
      ? topDrugs.reduce((sum, drug) => sum + drug.avgRating, 0) / topDrugs.length
      : 0;

  const renderBarChart = <T extends { _id?: string; drugName?: string }>(
    data: T[],
    label: string,
    valueKey: keyof T
  ) => {
    const maxValueRaw = Math.max(...data.map((item) => Number(item[valueKey] ?? 0)));
    const maxValue = maxValueRaw > 0 ? maxValueRaw : 1;
    const barPalette = ['#3349cc', '#3f57de', '#4b64ee', '#2f83cf', '#2b95b8'];
    
    return (
      <div className="chart-container">
        <h3>{label}</h3>
        <div className="chart">
          {data.slice(0, 10).map((item, index) => (
            <div key={index} className="chart-bar">
              <div className="bar-label">{item._id ?? item.drugName ?? 'Unknown'}</div>
              <div className="bar-wrapper">
                <div 
                  className="bar" 
                  style={{ 
                    width: `${(Number(item[valueKey] ?? 0) / maxValue) * 100}%`,
                    backgroundColor: barPalette[index % barPalette.length],
                    minWidth: '60px'
                  }}
                >
                  <span className={`bar-value ${Number(item[valueKey] ?? 0) < 5000 ? 'bar-value-small' : ''}`}>
                    {Number(item[valueKey] ?? 0).toFixed(1)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (hasError) {
    return (
      <div className="dashboard-container">
        <div className="error-state">
          <h2>Error loading dashboard data</h2>
          <p>Please try refreshing the page or check your connection.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <span className="eyebrow">Analytics</span>
        <h1 className="mb-4 bg-gradient-to-r from-indigo-900 via-blue-700 to-cyan-600 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent dark:from-indigo-100 dark:via-blue-200 dark:to-cyan-300 md:text-5xl leading-tight pb-2">
          Drug Analysis Dashboard
        </h1>
        <p className="text-[1.02rem] text-slate-600 dark:text-slate-300 mt-2">
          Comprehensive insights from patient reviews.
        </p>
      </header>

      <section className="stats-grid">
        <Card className="stat-card">
          <CardContent className="p-0">
            <h3>Total Reviews</h3>
            <div className="stat-value" style={{ color: 'white' }}>{totalReviews.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card className="stat-card">
          <CardContent className="p-0">
            <h3>Conditions</h3>
            <div className="stat-value" style={{ color: 'white' }}>{conditions.length}</div>
          </CardContent>
        </Card>
        <Card className="stat-card">
          <CardContent className="p-0">
            <h3>Average Rating</h3>
            <div className="stat-value" style={{ color: 'white' }}>{averageRating.toFixed(1)}/10</div>
          </CardContent>
        </Card>
        <Card className="stat-card">
          <CardContent className="p-0">
            <h3>Top Condition</h3>
            <div className="stat-value" style={{ color: 'white' }}>{conditions[0]?._id || 'N/A'}</div>
          </CardContent>
        </Card>
      </section>

      <section className="filters">
        <div className="form-group">
          <label htmlFor="condition-filter">Filter by Condition</label>
          <Select
            value={selectedCondition || 'all'}
            onValueChange={(value) => setSelectedCondition(value === 'all' ? '' : value)}
          >
            <SelectTrigger
              id="condition-filter"
              className="w-full border-slate-300 bg-white text-slate-900 shadow-sm"
            >
              <SelectValue placeholder="All Conditions" />
            </SelectTrigger>
            <SelectContent className="border-slate-200 bg-white text-slate-900 shadow-xl">
              <SelectItem value="all">All Conditions</SelectItem>
              {conditions.filter(condition => condition._id && condition._id.trim() !== '').map((condition) => (
                <SelectItem key={condition._id} value={condition._id}>
                  {condition._id}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="refresh-controls">
          <RefreshButton />
        </div>
      </section>

      <section className="charts-grid">
        {renderBarChart(topDrugs, 'Top Drugs by Effectiveness', 'effectiveness')}
        {renderBarChart(conditions, 'Conditions by Review Count', 'count')}
      </section>

      <section className="top-drugs-table">
        <h2>Top Performing Drugs</h2>
        <Table className="table-scroll text-slate-800">
          <TableHeader>
            <TableRow>
              <TableHead className="text-slate-700">Drug Name</TableHead>
              <TableHead className="text-slate-700">Condition</TableHead>
              <TableHead className="text-slate-700">Avg Rating</TableHead>
              <TableHead className="text-slate-700">Reviews</TableHead>
              <TableHead className="text-slate-700">Effectiveness</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {topDrugs.slice(0, 20).map((drug, index) => (
              <TableRow key={index}>
                <TableCell className="text-slate-800">{drug.drugName}</TableCell>
                <TableCell className="text-slate-700">{drug.condition}</TableCell>
                <TableCell>
                  <span className="rating">
                    {Array.from({ length: Math.floor(drug.avgRating / 2) }, () => '⭐').join('')}
                    {drug.avgRating % 2 !== 0 && '⭐'}
                    ({drug.avgRating.toFixed(1)})
                  </span>
                </TableCell>
                <TableCell className="text-slate-700">{drug.totalReviews}</TableCell>
                <TableCell className="text-slate-700">{drug.effectiveness.toFixed(0)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </div>
  );
}
