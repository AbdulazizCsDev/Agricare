export const pipeline = [
  {
    title: 'Data Collection',
    description: 'Gathered 50k+ labeled crop disease images from PlantVillage and field sources',
    icon: 'database',
  },
  {
    title: 'Data Cleaning',
    description: 'Removed duplicates, corrupted files, and low-quality images via automated scripts',
    icon: 'filter',
  },
  {
    title: 'Augmentation',
    description: 'Applied rotation, flipping, color jitter, and cutout — 5× dataset expansion',
    icon: 'layers',
  },
  {
    title: 'Model Training',
    description: 'Fine-tuned ResNet18, EfficientNet-B0, and MobileNetV2 with transfer learning',
    icon: 'cpu',
  },
  {
    title: 'Experiment Tracking',
    description: 'Logged metrics, hyperparameters, and model artifacts with MLflow',
    icon: 'activity',
  },
  {
    title: 'Evaluation',
    description: 'Benchmarked accuracy, F1-score, and confusion matrix on held-out test set',
    icon: 'bar-chart',
  },
  {
    title: 'FastAPI Deploy',
    description: 'RESTful endpoint serving top-3 predictions with confidence scores in <200ms',
    icon: 'server',
  },
]
