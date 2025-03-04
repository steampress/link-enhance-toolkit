
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Text, Edit2, RotateCw, Copy } from 'lucide-react';
import { toast } from 'sonner';

interface GuidedProfileEditorProps {
  section: 'headline' | 'summary' | 'experience';
  className?: string;
}

const GuidedProfileEditor: React.FC<GuidedProfileEditorProps> = ({ section, className }) => {
  const [step, setStep] = useState(0);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');

  const sectionConfig = {
    headline: {
      title: 'Headline Creator',
      description: 'Create a compelling headline that highlights your professional identity and value.',
      questions: [
        { id: 'role', label: 'What is your current or desired job title?' },
        { id: 'industry', label: 'What industry do you work in?' },
        { id: 'specialty', label: 'What is your main specialty or skill?' },
        { id: 'value', label: 'What value do you bring to employers or clients?' }
      ]
    },
    summary: {
      title: 'Summary Builder',
      description: 'Create a powerful summary that showcases your expertise and career narrative.',
      questions: [
        { id: 'experience', label: 'How many years of experience do you have in your field?' },
        { id: 'achievements', label: 'What are your top 2-3 professional achievements?' },
        { id: 'strengths', label: 'What are your key strengths or areas of expertise?' },
        { id: 'goals', label: 'What are your professional goals or what value do you aim to provide?' }
      ]
    },
    experience: {
      title: 'Experience Optimizer',
      description: 'Transform your work experience into powerful accomplishment statements.',
      questions: [
        { id: 'position', label: 'What position or role do you want to optimize?' },
        { id: 'company', label: 'At which company did you hold this position?' },
        { id: 'responsibilities', label: 'What were your main responsibilities in this role?' },
        { id: 'achievements', label: 'What measurable results or achievements did you accomplish?', multiline: true },
        { id: 'skills', label: 'What skills or tools did you use in this role?' }
      ]
    }
  };

  const config = sectionConfig[section];
  const currentQuestion = config.questions[step];
  const isLastStep = step === config.questions.length - 1;

  const handleNext = () => {
    if (!responses[currentQuestion.id]?.trim()) {
      toast.error('Please answer the question before proceeding');
      return;
    }
    
    if (isLastStep) {
      generateContent();
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(Math.max(0, step - 1));
  };

  const handleResponseChange = (id: string, value: string) => {
    setResponses({ ...responses, [id]: value });
  };

  const generateContent = () => {
    setIsGenerating(true);
    
    // Simulate AI generation (would connect to a real LLM in production)
    setTimeout(() => {
      let content = '';
      
      if (section === 'headline') {
        content = `${responses.role} with expertise in ${responses.specialty} | ${responses.industry} Professional | ${responses.value}`;
      } else if (section === 'summary') {
        content = `Results-driven professional with ${responses.experience} years of experience in the industry. Known for ${responses.strengths}. Notable achievements include ${responses.achievements}. Aiming to ${responses.goals} while delivering exceptional value to organizations.`;
      } else if (section === 'experience') {
        content = `${responses.position} at ${responses.company}\n\n• Led initiatives to ${responses.responsibilities}\n• Achieved ${responses.achievements}\n• Leveraged expertise in ${responses.skills} to drive results`;
      }
      
      setGeneratedContent(content);
      setIsGenerating(false);
      toast.success(`${config.title} complete!`);
    }, 2000);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent);
    toast.success('Copied to clipboard!');
  };

  const handleReset = () => {
    setStep(0);
    setResponses({});
    setGeneratedContent('');
  };

  return (
    <div className={`glass-panel rounded-2xl p-6 ${className}`}>
      <h3 className="text-xl font-semibold mb-2">{config.title}</h3>
      <p className="text-muted-foreground mb-6">{config.description}</p>

      {!generatedContent ? (
        <div className="space-y-6">
          <div className="mb-4">
            <div className="flex justify-between mb-2">
              <label htmlFor={currentQuestion.id} className="block text-sm font-medium">
                {currentQuestion.label}
              </label>
              <span className="text-sm text-muted-foreground">
                Step {step + 1} of {config.questions.length}
              </span>
            </div>
            
            {currentQuestion.multiline ? (
              <Textarea
                id={currentQuestion.id}
                value={responses[currentQuestion.id] || ''}
                onChange={(e) => handleResponseChange(currentQuestion.id, e.target.value)}
                rows={4}
                className="mb-4"
              />
            ) : (
              <Input
                id={currentQuestion.id}
                value={responses[currentQuestion.id] || ''}
                onChange={(e) => handleResponseChange(currentQuestion.id, e.target.value)}
                className="mb-4"
              />
            )}
          </div>

          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={handleBack}
              disabled={step === 0}
            >
              Back
            </Button>
            <Button onClick={handleNext}>
              {isLastStep ? 'Generate' : 'Next'}
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-secondary/20 rounded-lg p-4 border border-border">
            <h4 className="font-medium mb-2">Your Optimized {section === 'headline' ? 'Headline' : section === 'summary' ? 'Summary' : 'Experience'}</h4>
            <div className="whitespace-pre-line">{generatedContent}</div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" onClick={handleReset} className="flex items-center">
              <RotateCw className="mr-2 h-4 w-4" />
              Start Over
            </Button>
            <Button onClick={handleCopyToClipboard} className="flex items-center">
              <Copy className="mr-2 h-4 w-4" />
              Copy to Clipboard
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuidedProfileEditor;
