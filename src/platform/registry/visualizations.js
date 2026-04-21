import { classificationLossDefinition } from '../../features/visualizations/001-classification-loss/definition'
import { regularizationDefinition } from '../../features/visualizations/002-regularization/definition.js'

export const visualizations = [
  {
    id: 'viz-001',
    title: 'Classification Loss Visualizer',
    category: 'Loss Functions',
    description: 'Compare 0-1, hinge, log, and squared losses with an interactive probe.',
    tags: ['classification', 'loss', 'hinge', 'cross-entropy'],
    definition: classificationLossDefinition,
  },
  {
    id: 'viz-002',
    title: 'L1 vs L2 Regularization',
    category: 'Linear Models',
    description: 'See how Lasso (L1) induces sparsity while Ridge (L2) shrinks coefficients smoothly.',
    tags: ['regularization', 'lasso', 'ridge', 'lasso', 'feature-selection'],
    definition: regularizationDefinition,
  },
  {
    id: 'viz-010',
    title: 'Linear Classifier Margins',
    category: 'Linear Models',
    description: 'Explore margin width and support vectors for binary classifiers.',
    tags: ['svm', 'margin', 'linear'],
  },
  {
    id: 'viz-020',
    title: 'Decision Boundary Sandbox',
    category: 'Linear Models',
    description: 'Interact with weight vectors and observe boundary movement.',
    tags: ['decision boundary', 'weights', 'classification'],
  },
  {
    id: 'viz-030',
    title: 'Activation Geometry',
    category: 'Neural Networks',
    description: 'Visualize ReLU, tanh, and sigmoid transforms in latent space.',
    tags: ['activation', 'relu', 'sigmoid'],
  },
  {
    id: 'viz-040',
    title: 'K-Means Convergence Paths',
    category: 'Clustering',
    description: 'Track centroid updates across iterations and inertia changes.',
    tags: ['kmeans', 'clustering', 'optimization'],
  },
]
