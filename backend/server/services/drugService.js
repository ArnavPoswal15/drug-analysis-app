const Drug = require('../models/drugModel');

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 100;

function parsePositiveInteger(value, fallback) {
  const parsedValue = parseInt(value, 10);
  return Number.isNaN(parsedValue) || parsedValue < 1 ? fallback : parsedValue;
}

function getPaginationParams(query, defaultLimit = DEFAULT_LIMIT) {
  const page = parsePositiveInteger(query.page, DEFAULT_PAGE);
  const limit = Math.min(parsePositiveInteger(query.limit, defaultLimit), MAX_LIMIT);
  const skip = (page - 1) * limit;
  return { page, limit, skip };
}

function buildPaginationMeta(total, page, limit) {
  const totalPages = Math.max(Math.ceil(total / limit), 1);
  return {
    total,
    totalPages,
    currentPage: page,
    perPage: limit,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1
  };
}

async function getDrugs(queryParams) {
  const { condition, search } = queryParams;
  const { page, limit, skip } = getPaginationParams(queryParams);
  const query = {};

  if (condition) query.condition = condition;
  if (search) {
    query.$or = [
      { drugName: { $regex: search, $options: 'i' } },
      { condition: { $regex: search, $options: 'i' } }
    ];
  }

  const drugs = await Drug.find(query).limit(limit).skip(skip).sort({ usefulCount: -1 });
  const total = await Drug.countDocuments(query);
  const pagination = buildPaginationMeta(total, page, limit);

  return {
    drugs,
    totalPages: pagination.totalPages,
    currentPage: pagination.currentPage,
    total: pagination.total,
    pagination
  };
}

async function getConditionCounts(queryParams) {
  const hasExplicitPagination =
    queryParams.page !== undefined || queryParams.limit !== undefined;
  
  if (!hasExplicitPagination) {
    // Return all conditions when no pagination is specified
    const conditionCounts = await Drug.aggregate([
      { $group: { _id: '$condition', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    return conditionCounts;
  }

  const { page, limit, skip } = getPaginationParams(queryParams);
  const conditionCounts = await Drug.aggregate([
    { $group: { _id: '$condition', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    {
      $facet: {
        data: [{ $skip: skip }, { $limit: limit }],
        metadata: [{ $count: 'total' }]
      }
    }
  ]);

  const aggregated = conditionCounts[0] || { data: [], metadata: [] };
  const total = aggregated.metadata[0] ? aggregated.metadata[0].total : 0;

  return {
    conditions: aggregated.data,
    pagination: buildPaginationMeta(total, page, limit)
  };
}

async function getTopDrugs(queryParams) {
  const { condition } = queryParams;
  const { page, limit, skip } = getPaginationParams(queryParams, 10);
  const matchStage = {};
  if (condition) matchStage.condition = condition;

  const topDrugs = await Drug.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: '$drugName',
        avgRating: { $avg: '$rating' },
        totalReviews: { $sum: 1 },
        totalUseful: { $sum: '$usefulCount' },
        condition: { $first: '$condition' }
      }
    },
    {
      $addFields: {
        effectiveness: { $multiply: ['$avgRating', '$totalUseful'] }
      }
    },
    { $sort: { effectiveness: -1 } },
    { $addFields: { drugName: '$_id' } },
    {
      $facet: {
        data: [{ $skip: skip }, { $limit: limit }],
        metadata: [{ $count: 'total' }]
      }
    }
  ]);

  const aggregated = topDrugs[0] || { data: [], metadata: [] };
  const total = aggregated.metadata[0] ? aggregated.metadata[0].total : 0;
  const hasExplicitPagination = queryParams.page !== undefined;

  if (!hasExplicitPagination) {
    return aggregated.data;
  }

  return {
    drugs: aggregated.data,
    pagination: buildPaginationMeta(total, page, limit)
  };
}

module.exports = {
  getDrugs,
  getConditionCounts,
  getTopDrugs
};
