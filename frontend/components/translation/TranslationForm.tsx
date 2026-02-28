'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { TranslateRequest, Provider } from '@/types/translation';
import { PROVIDERS, TONES, ARTICLE_TYPES } from '@/lib/constants';
import Button from '@/components/ui/Button';
import Textarea from '@/components/ui/Textarea';
import Card from '@/components/ui/Card';
import LanguageSelector from './LanguageSelector';
import ProviderSelector from './ProviderSelector';
import Select from '@/components/ui/Select';

const formSchema = z.object({
  text: z.string().min(1, 'Text cannot be empty'),
  sourceLang: z.string().min(2),
  targetLanguages: z.array(z.string()).min(1, 'Select at least one target language'),
  provider: z.enum(['openai', 'google']),
  model: z.string().optional(),
  tone: z.string().optional(),
  articleType: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface TranslationFormProps {
  onSubmit: (request: TranslateRequest) => void;
  isLoading: boolean;
}

export default function TranslationForm({ onSubmit, isLoading }: TranslationFormProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: '',
      sourceLang: 'en',
      targetLanguages: [],
      provider: 'openai',
      model: PROVIDERS.openai.defaultModel,
      tone: undefined,
      articleType: undefined,
    },
  });

  const sourceLang = watch('sourceLang');
  const targetLanguages = watch('targetLanguages');
  const provider = watch('provider') as Provider;
  const model = watch('model');

  const onSubmitForm = (data: FormData) => {
    onSubmit({
      text: data.text,
      sourceLang: data.sourceLang,
      targetLanguages: data.targetLanguages,
      provider: data.provider,
      model: data.model,
      tone: data.tone,
      articleType: data.articleType,
    });
  };

  return (
    <Card variant="elevated" hover className="h-fit">
      <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Translate Article
          </h2>
          <p className="text-gray-400">
            Enter your article text and select target languages
          </p>
        </div>

        <div>
          <Textarea
            label="Article Text"
            placeholder="Paste or type your article here..."
            rows={10}
            showCount
            maxLength={5000}
            {...register('text')}
            error={errors.text?.message}
            className="font-mono text-sm"
          />
        </div>

        <LanguageSelector
          sourceLang={sourceLang}
          targetLanguages={targetLanguages}
          onSourceChange={(lang) => setValue('sourceLang', lang)}
          onTargetChange={(langs) => setValue('targetLanguages', langs)}
        />
        {errors.targetLanguages && (
          <p className="text-sm text-red-400">{errors.targetLanguages.message}</p>
        )}

        <ProviderSelector
          provider={provider}
          model={model}
          onProviderChange={(p) => {
            setValue('provider', p);
            setValue('model', PROVIDERS[p].defaultModel);
          }}
          onModelChange={(m) => setValue('model', m)}
        />

        <div>
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-white/10 bg-[#0a0a0a] hover:bg-[#1a1a1a] transition-colors"
          >
            <span className="text-sm font-medium text-gray-300">
              Advanced Options
            </span>
            {showAdvanced ? (
              <ChevronUp className="h-4 w-4 text-gray-400" />
            ) : (
              <ChevronDown className="h-4 w-4 text-gray-400" />
            )}
          </button>

          <AnimatePresence>
            {showAdvanced && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="mt-4 space-y-4 p-4 bg-[#0a0a0a] rounded-lg border border-white/5">
                  <Select
                    label="Tone"
                    {...register('tone')}
                    options={[
                      { value: '', label: 'Default' },
                      ...TONES.map((tone) => ({
                        value: tone,
                        label: tone.charAt(0).toUpperCase() + tone.slice(1),
                      })),
                    ]}
                  />

                  <Select
                    label="Article Type"
                    {...register('articleType')}
                    options={[
                      { value: '', label: 'Default' },
                      ...ARTICLE_TYPES.map((type) => ({
                        value: type,
                        label: type.charAt(0).toUpperCase() + type.slice(1),
                      })),
                    ]}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.div
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <Button
            type="submit"
            size="lg"
            isLoading={isLoading}
            className="w-full"
            disabled={isLoading}
          >
            Translate Article
          </Button>
        </motion.div>
      </form>
    </Card>
  );
}
