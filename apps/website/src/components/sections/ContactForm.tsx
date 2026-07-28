'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { Checkbox } from '@/components/ui/Checkbox';
import { Button } from '@/components/ui/Button';
import { submitContact } from '@/lib/api';

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
  privacy: boolean;
}

const subjects = [
  { value: 'info', label: 'Informações gerais' },
  { value: 'demo', label: 'Solicitar demonstração' },
  { value: 'partnership', label: 'Parceria' },
  { value: 'support', label: 'Suporte técnico' },
  { value: 'other', label: 'Outro' },
];

const initialForm: FormData = {
  name: '',
  email: '',
  phone: '',
  company: '',
  subject: '',
  message: '',
  privacy: false,
};

export function ContactForm() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormData, string>> = {};
    if (!form.name.trim()) next.name = 'Nome é obrigatório';
    if (!form.email.trim()) next.email = 'Email é obrigatório';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Email inválido';
    if (!form.subject) next.subject = 'Assunto é obrigatório';
    if (!form.message.trim() || form.message.trim().length < 5) {
      next.message = 'Mensagem deve ter pelo menos 5 caracteres';
    }
    if (!form.privacy) next.privacy = 'Você deve aceitar a política de privacidade';

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange =
    (field: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
      setForm((prev) => ({ ...prev, [field]: value }));
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    if (!validate()) return;

    setLoading(true);
    try {
      const subjectLabel = subjects.find((s) => s.value === form.subject)?.label || form.subject;
      await submitContact({
        name: form.name,
        email: form.email,
        phone: form.phone || undefined,
        company: form.company || undefined,
        message: `Assunto: ${subjectLabel}\n\n${form.message}`,
      });
      setSubmitted(true);
      setForm(initialForm);
    } catch {
      setSubmitError('Não foi possível enviar sua mensagem. Tente novamente em instantes.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="space-y-3 rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
        <h3 className="text-lg font-bold text-green-900">Obrigado pelo contato!</h3>
        <p className="text-green-700">Recebemos sua mensagem e vamos retornar em breve.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        id="name"
        label="Nome completo"
        value={form.name}
        onChange={handleChange('name')}
        error={errors.name}
        placeholder="Seu nome"
        required
      />

      <Input
        id="email"
        type="email"
        label="Email"
        value={form.email}
        onChange={handleChange('email')}
        error={errors.email}
        placeholder="voce@empresa.com"
        required
      />

      <Input
        id="phone"
        type="tel"
        label="Telefone"
        value={form.phone}
        onChange={handleChange('phone')}
        placeholder="(XX) XXXXX-XXXX"
      />

      <Input
        id="company"
        label="Empresa"
        value={form.company}
        onChange={handleChange('company')}
        placeholder="Sua empresa"
      />

      <Select
        id="subject"
        label="Assunto"
        options={subjects}
        value={form.subject}
        onChange={handleChange('subject')}
        error={errors.subject}
        placeholder="Selecione um assunto"
        required
      />

      <Textarea
        id="message"
        label="Mensagem"
        value={form.message}
        onChange={handleChange('message')}
        error={errors.message}
        placeholder="Conte-nos sobre sua necessidade..."
        required
      />

      <Checkbox
        label="Li e concordo com a Política de Privacidade"
        checked={form.privacy}
        onChange={handleChange('privacy')}
        error={errors.privacy}
        required
      />

      {submitError && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {submitError}
        </div>
      )}

      <Button type="submit" variant="primary" size="lg" disabled={loading} className="w-full">
        {loading ? 'Enviando...' : 'Enviar mensagem'}
      </Button>
    </form>
  );
}
