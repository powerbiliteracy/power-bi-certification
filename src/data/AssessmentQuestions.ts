import { prepareDataQuestions } from './questions/PrepareDataQuestions';
import { modelDataQuestions } from './questions/ModelDataQuestions';
import { visualizeAnalyzeQuestions } from './questions/VisualizeAnalyzeQuestions';
import { deployMaintainQuestions } from './questions/DeployMaintainQuestions';

export const assessmentQuestions = [
  ...prepareDataQuestions,
  ...modelDataQuestions,
  ...visualizeAnalyzeQuestions,
  ...deployMaintainQuestions,
];

export function getQuestionStats() {
  const stats: Record<string, { total: number; sections: Record<string, { total: number; topics: Record<string, number> }> }> = {
    prepare_data: { total: 0, sections: {} },
    model_data: { total: 0, sections: {} },
    visualize_analyze: { total: 0, sections: {} },
    deploy_maintain: { total: 0, sections: {} }
  };

  assessmentQuestions.forEach((q: any) => {
    stats[q.domain].total++;
    if (!stats[q.domain].sections[q.section]) {
      stats[q.domain].sections[q.section] = { total: 0, topics: {} };
    }
    stats[q.domain].sections[q.section].total++;
    if (!stats[q.domain].sections[q.section].topics[q.topic]) {
      stats[q.domain].sections[q.section].topics[q.topic] = 0;
    }
    stats[q.domain].sections[q.section].topics[q.topic]++;
  });

  return stats;
}
