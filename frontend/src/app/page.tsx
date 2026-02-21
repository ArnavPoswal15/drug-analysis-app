'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useDrugs, useConditions } from '@/hooks/use-api';
import './page.css';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCondition, setSelectedCondition] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  // Use cached data fetching hooks
  const { data: drugsData, isLoading: drugsLoading, error: drugsError } = useDrugs({
    page: currentPage,
    limit: 20,
    condition: selectedCondition,
    search: searchTerm
  });
  const { data: conditionsData, isLoading: conditionsLoading, error: conditionsError } = useConditions();
  
  // Safely extract data with fallbacks
  const drugs = drugsData?.drugs || [];
  const conditions = Array.isArray(conditionsData) ? conditionsData : [];
  const totalPages = drugsData?.totalPages || 1;
  
  // Loading and error states
  const loading = drugsLoading || conditionsLoading;
  const error = drugsError || conditionsError;
  const averageRating =
    drugs.length > 0
      ? drugs.reduce((sum, drug) => sum + drug.rating, 0) / drugs.length
      : 0;
  const totalHelpfulReviews = drugs.reduce((sum, drug) => sum + drug.usefulCount, 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getVisiblePages = () => {
    const windowSize = 5;
    const halfWindow = Math.floor(windowSize / 2);
    let start = Math.max(1, currentPage - halfWindow);
    const end = Math.min(totalPages, start + windowSize - 1);

    // Keep a full window when possible.
    if (end - start + 1 < windowSize) {
      start = Math.max(1, end - windowSize + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating / 2);
    const hasHalfStar = rating % 2 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push('⭐');
    }
    if (hasHalfStar) {
      stars.push('⭐');
    }
    return stars.join(' ');
  };

  return (
    <div className="container">
      <header className="header">
        <span className="eyebrow">Medication Insights</span>
        <h1 className="page-title">Drug Analysis Platform</h1>
        <p className="page-subtitle">Find effective medications based on real patient reviews.</p>
      </header>

      <section className="search-section" id="filters">
        <form onSubmit={handleSearch} className="search-form">
          <div className="form-group">
            <label htmlFor="search">Search Drugs</label>
            <Input
              type="text"
              id="search"
              placeholder="Enter drug name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="condition">Condition</label>
            <Select
              value={selectedCondition || 'all'}
              onValueChange={(value) => setSelectedCondition(value === 'all' ? '' : value)}
            >
              <SelectTrigger
                id="condition"
                className="w-full border-slate-300 bg-white text-slate-900 shadow-sm"
              >
                <SelectValue placeholder="All Conditions" />
              </SelectTrigger>
              <SelectContent className="border-slate-200 bg-white text-slate-900 shadow-xl">
                <SelectItem value="all">All Conditions</SelectItem>
                {conditions.map((condition) => (
                  <SelectItem key={condition._id} value={condition._id}>
                    {condition._id} ({condition.count})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <Button type="submit" className="btn btn-primary">
            Apply Filters
          </Button>
        </form>
      </section>

      {error && <div className="error">{typeof error === 'string' ? error : 'Failed to fetch data. Please try again.'}</div>}

      {loading && drugs.length === 0 ? (
        <div className="loading">Loading drugs...</div>
      ) : (
        <>
          <section className="insights-grid">
            <Card className="insight-card">
              <CardContent className="p-0">
                <p className="insight-label">Results on page</p>
                <p className="insight-value">{drugs.length}</p>
              </CardContent>
            </Card>
            <Card className="insight-card">
              <CardContent className="p-0">
                <p className="insight-label">Average rating</p>
                <p className="insight-value">{averageRating.toFixed(1)}/10</p>
              </CardContent>
            </Card>
            <Card className="insight-card">
              <CardContent className="p-0">
                <p className="insight-label">Helpful reviews</p>
                <p className="insight-value">{totalHelpfulReviews.toLocaleString()}</p>
              </CardContent>
            </Card>
          </section>

          <div className="drug-grid">
            {drugs.map((drug) => (
              <Card key={drug.uniqueID} className="drug-card">
                <div className="drug-card-head">
                  <h3 className="drug-name">{drug.drugName}</h3>
                  <Badge variant="secondary" className="condition-pill">
                    {drug.condition}
                  </Badge>
                </div>
                
                <div className="drug-stats">
                  <div className="stat">
                    <div className="stat-value rating">{renderStars(drug.rating)}</div>
                    <div className="stat-label">Rating: {drug.rating}/10</div>
                  </div>
                  <div className="stat">
                    <div className="stat-value">{drug.usefulCount}</div>
                    <div className="stat-label">Helpful Reviews</div>
                  </div>
                </div>
                
                <div className="drug-review">
                  {drug.review.length > 100 
                    ? `${drug.review.substring(0, 100)}...` 
                    : drug.review}
                </div>
              </Card>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <Button
                type="button"
                variant="outline"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Prev
              </Button>

              <div className="pagination-track">
                {getVisiblePages().map((page) => (
                  <Button
                    key={page}
                    type="button"
                    variant={currentPage === page ? 'default' : 'outline'}
                    onClick={() => handlePageChange(page)}
                    className={currentPage === page ? 'active' : ''}
                  >
                    {page}
                  </Button>
                ))}
              </div>

              <Button
                type="button"
                variant="outline"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
