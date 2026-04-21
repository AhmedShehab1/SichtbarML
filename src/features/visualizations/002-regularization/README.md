# L1 vs L2 Regularization Visualizer

## Overview

This module visualizes how L1 (Lasso) and L2 (Ridge) regularization affect model coefficients as the penalty strength changes.

## Key Concepts

### L1 Regularization (Lasso)
- **Formula**: Soft thresholding: `sgn(w) * max(0, |w| - λ)`
- **Effect**: Creates **sparsity** by pushing coefficients to exactly zero
- **Use case**: Feature selection; useful when you want to identify the most important features
- **Visual cue**: Bars disappear (become zero) as penalty increases

### L2 Regularization (Ridge)
- **Formula**: Shrinkage: `w / (1 + λ)`
- **Effect**: Shrinks all coefficients **proportionally** without reaching zero
- **Use case**: Handling multicollinearity; distributes weight across correlated features
- **Visual cue**: All bars shrink together as penalty increases

## Parameters

- **Penalty Type**: Toggle between L1 Lasso and L2 Ridge
- **log₁₀(C)**: Slider controlling regularization strength
  - Higher C = weaker penalty (more flexibility)
  - Lower C = stronger penalty (more constraint)

## HUD Metrics

- **C (Strength)**: The actual regularization parameter (inverse of λ)
- **Active Features**: Count of non-zero coefficients
- **Sparsity**: Percentage of coefficients that have been zeroed out (L1 only)

## Implementation Details

- `engine.js`: Pure math functions for L1/L2 computation
- `definition.js`: Visualization spec with params, HUD, and Plot setup
- Bar chart shows original coefficients (ghosted) vs. regularized (colored by sign)
