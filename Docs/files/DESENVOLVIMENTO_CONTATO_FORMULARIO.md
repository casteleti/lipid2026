# 📞 DESENVOLVIMENTO PÁGINA CONTATO + FORMULÁRIO
## Contact Page com Integração Backend + Email

**Status:** Módulo 3 de 6  
**Escopo:** Página de contato + Formulário completo + Email backend  
**Tempo:** 6-8 horas  
**Dependência:** API backend com endpoint de leads  

---

## 📋 ÍNDICE

1. [Visão Geral](#visão-geral)
2. [Componentes de Formulário](#componentes-de-formulário)
3. [Página de Contato](#página-de-contato)
4. [Integração Backend](#integração-backend)
5. [Validação e Tratamento de Erros](#validação-e-tratamento-de-erros)
6. [Email e Confirmação](#email-e-confirmação)
7. [Testes](#testes)

---

## 🎯 VISÃO GERAL

```
PÁGINA: /contato
┌─────────────────────────────────────┐
│ Hero section                        │
│ "Fale com nossos especialistas"    │
├─────────────────────────────────────┤
│ 2 Colunas:                          │
│ Esq: Formulário                     │
│ Dir: Info de contato + Mapa         │
├─────────────────────────────────────┤
│ Footer                              │
└─────────────────────────────────────┘

FORMULÁRIO FIELDS:
✅ Nome (required)
✅ Email (required, validated)
✅ Telefone (optional)
✅ Empresa (optional)
✅ Assunto (select)
✅ Mensagem (textarea, required)
✅ Checkbox (privacidade)
✅ reCAPTCHA (opcional - Fase 2)

FLUXO:
1. Usuário preenche formulário
2. Validação frontend
3. Submit → API
4. Email automático (backend)
5. Confirmação ao usuário
6. Lead criado no CRM (Fase 3)
```

---

## 🧩 COMPONENTES DE FORMULÁRIO

### Componente 1: Input

**Arquivo:** `apps/website/src/components/ui/Input.tsx`

```typescript
import clsx from 'clsx';
import { ReactNode } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helpText?: string;
  icon?: ReactNode;
}

export function Input({
  label,
  error,
  helpText,
  icon,
  className,
  ...props
}: InputProps) {
  return (
    <div className="w-full space-y-2">
      {label && (
        <label className="block text-sm font-semibold text-gray-900">
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        <input
          className={clsx(
            'w-full px-4 py-3 rounded-lg border transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-primary-500',
            error
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:border-primary-500',
            icon && 'pl-10',
            className,
          )}
          {...props}
        />
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            {icon}
          </div>
        )}
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}
      {helpText && !error && <p className="text-sm text-gray-500">{helpText}</p>}
    </div>
  );
}
```

---

### Componente 2: Textarea

**Arquivo:** `apps/website/src/components/ui/Textarea.tsx`

```typescript
import clsx from 'clsx';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helpText?: string;
}

export function Textarea({
  label,
  error,
  helpText,
  className,
  ...props
}: TextareaProps) {
  return (
    <div className="w-full space-y-2">
      {label && (
        <label className="block text-sm font-semibold text-gray-900">
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <textarea
        className={clsx(
          'w-full px-4 py-3 rounded-lg border transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-primary-500',
          'resize-none',
          error
            ? 'border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:border-primary-500',
          className,
        )}
        rows={5}
        {...props}
      />

      {error && <p className="text-sm text-red-500">{error}</p>}
      {helpText && !error && <p className="text-sm text-gray-500">{helpText}</p>}
    </div>
  );
}
```

---

### Componente 3: Select

**Arquivo:** `apps/website/src/components/ui/Select.tsx`

```typescript
import clsx from 'clsx';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
  placeholder?: string;
}

export function Select({
  label,
  options,
  error,
  placeholder,
  className,
  ...props
}: SelectProps) {
  return (
    <div className="w-full space-y-2">
      {label && (
        <label className="block text-sm font-semibold text-gray-900">
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <select
        className={clsx(
          'w-full px-4 py-3 rounded-lg border transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-primary-500',
          error
            ? 'border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:border-primary-500',
          className,
        )}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
```

---

### Componente 4: Checkbox

**Arquivo:** `apps/website/src/components/ui/Checkbox.tsx`

```typescript
import clsx from 'clsx';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function Checkbox({ label, error, className, ...props }: CheckboxProps) {
  return (
    <div className="space-y-2">
      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          className={clsx(
            'w-5 h-5 rounded border-gray-300 text-primary-600',
            'focus:ring-2 focus:ring-primary-500 mt-1',
            className,
          )}
          {...props}
        />
        <span className="text-sm text-gray-700">{label}</span>
      </label>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
```

---

### Componente 5: ContactForm

**Arquivo:** `apps/website/src/components/sections/ContactForm.tsx`

```typescript
'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { Checkbox } from '@/components/ui/Checkbox';
import { Button } from '@/components/ui/Button';
import { api } from '@/lib/api';

interface FormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  privacy: boolean;
}

interface FormErrors {
  [key: string]: string;
}

const subjects = [
  { value: 'info', label: 'Informações gerais' },
  { value: 'demo', label: 'Solicitar demonstração' },
  { value: 'partnership', label: 'Parceria' },
  { value: 'support', label: 'Suporte técnico' },
  { value: 'other', label: 'Outro' },
];

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    privacy: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Nome é obrigatório';
    if (!formData.email.trim()) newErrors.email = 'Email é obrigatório';
    if (formData.email && !formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = 'Email inválido';
    }
    if (!formData.subject) newErrors.subject = 'Assunto é obrigatório';
    if (!formData.message.trim()) newErrors.message = 'Mensagem é obrigatória';
    if (!formData.privacy) newErrors.privacy = 'Você deve aceitar a política de privacidade';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      await api.post('/leads', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        company: formData.company || null,
        subject: formData.subject,
        message: formData.message,
        source: 'website_contact_form',
      });

      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: '',
        privacy: false,
      });

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      setErrors({
        submit: 'Erro ao enviar. Tente novamente ou fale conosco por telefone.',
      });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center space-y-3">
        <h3 className="text-lg font-bold text-green-900">Obrigado!</h3>
        <p className="text-green-700">
          Sua mensagem foi enviada com sucesso. Entraremos em contato em breve.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <Input
        label="Nome completo"
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
        placeholder="João Silva"
        required
      />

      {/* Email */}
      <Input
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        placeholder="joao@empresa.com"
        required
      />

      {/* Phone */}
      <Input
        label="Telefone"
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="(XX) XXXXX-XXXX"
      />

      {/* Company */}
      <Input
        label="Empresa"
        name="company"
        value={formData.company}
        onChange={handleChange}
        placeholder="Sua empresa"
      />

      {/* Subject */}
      <Select
        label="Assunto"
        name="subject"
        options={subjects}
        value={formData.subject}
        onChange={handleChange}
        error={errors.subject}
        placeholder="Selecione um assunto"
        required
      />

      {/* Message */}
      <Textarea
        label="Mensagem"
        name="message"
        value={formData.message}
        onChange={handleChange}
        error={errors.message}
        placeholder="Conte-nos sobre sua necessidade..."
        required
      />

      {/* Privacy */}
      <Checkbox
        name="privacy"
        label="Li e concordo com a Política de Privacidade"
        checked={formData.privacy}
        onChange={handleChange}
        error={errors.privacy}
        required
      />

      {/* Submit Error */}
      {errors.submit && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          {errors.submit}
        </div>
      )}

      {/* Button */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={loading}
        className="w-full"
      >
        {loading ? 'Enviando...' : 'Enviar mensagem'}
      </Button>

      <p className="text-xs text-gray-500 text-center">
        Responderemos em até 24 horas úteis.
      </p>
    </form>
  );
}
```

---

## 📱 PÁGINA CONTATO

**Arquivo:** `apps/website/src/app/contato/page.tsx`

```typescript
import { ContactForm } from '@/components/sections/ContactForm';
import { ListingHero } from '@/components/ui/ListingHero';
import { Card } from '@/components/ui/Card';

export const metadata = {
  title: 'Contato - Daksa',
  description: 'Entre em contato com nossos especialistas em tecnologias lipídicas.',
};

export default function ContactPage() {
  return (
    <>
      <ListingHero
        title="Fale com Nossos Especialistas"
        description="Dúvidas sobre tecnologias, aplicações ou parcerias? Entre em contato e descubra como podemos ajudar seu negócio."
        badge="CONTATO"
      />

      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left: Form */}
            <div>
              <h2 className="text-3xl font-bold mb-8">Envie uma mensagem</h2>
              <ContactForm />
            </div>

            {/* Right: Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-6">Informações de Contato</h3>
                <div className="space-y-4">
                  <Card className="space-y-2">
                    <h4 className="font-semibold">📞 Telefone</h4>
                    <p className="text-gray-600">+55 16 14056-667</p>
                    <p className="text-sm text-gray-500">Seg-Sex: 8h-18h</p>
                  </Card>

                  <Card className="space-y-2">
                    <h4 className="font-semibold">📧 Email</h4>
                    <p className="text-gray-600">contato@lipid.com.br</p>
                    <p className="text-sm text-gray-500">Resposta em 24h</p>
                  </Card>

                  <Card className="space-y-2">
                    <h4 className="font-semibold">📍 Endereço</h4>
                    <p className="text-gray-600">
                      Supera Parque Tecnológico<br />
                      Ribeirão Preto — SP<br />
                      Brasil
                    </p>
                  </Card>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Localização</h3>
                <div className="bg-gray-200 rounded-lg h-80 flex items-center justify-center">
                  <p className="text-gray-600">Mapa (integrar Google Maps - Fase 2)</p>
                </div>
              </div>

              {/* FAQ */}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Perguntas Frequentes</h3>
                <Card className="space-y-3">
                  <h4 className="font-semibold">Qual é o tempo de resposta?</h4>
                  <p className="text-sm text-gray-600">
                    Respondemos todas as mensagens em até 24 horas úteis.
                  </p>
                </Card>

                <Card className="space-y-3">
                  <h4 className="font-semibold">Como solicitar informações técnicas?</h4>
                  <p className="text-sm text-gray-600">
                    Preencha o formulário indicando "Suporte técnico" como assunto.
                  </p>
                </Card>

                <Card className="space-y-3">
                  <h4 className="font-semibold">Fazem orçamentos personalizados?</h4>
                  <p className="text-sm text-gray-600">
                    Sim! Selecione "Outro" e descreva sua necessidade no formulário.
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-primary-600 text-white">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            Prefere uma ligação?
          </h2>
          <p className="text-lg text-primary-100">
            Fale direto com nossos especialistas. Ligamos para você!
          </p>
          <a
            href="tel:+551640566667"
            className="inline-block px-8 py-3 bg-white text-primary-600 rounded-full font-semibold hover:bg-gray-100 transition-colors"
          >
            Solicitar ligação
          </a>
        </div>
      </section>
    </>
  );
}
```

---

## 🔗 INTEGRAÇÃO BACKEND

### Tipos para Leads

**Arquivo:** `apps/website/src/types/api.ts` (adicionar)

```typescript
export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  source: 'website_contact_form' | 'website_newsletter' | 'other';
  status: 'new' | 'contacted' | 'converted' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  source: string;
}
```

### API Call

**Arquivo:** `apps/website/src/lib/api.ts` (adicionar método)

```typescript
async submitLead(data: ContactFormData): Promise<Lead> {
  return this.client.post<Lead>('/leads', data);
}
```

---

## ✅ VALIDAÇÃO

### Validação Helpers

**Arquivo:** `apps/website/src/lib/validation.ts`

```typescript
export const validators = {
  email: (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  },

  phone: (phone: string): boolean => {
    return /^[\d\s\-()]+$/.test(phone) && phone.replace(/\D/g, '').length >= 10;
  },

  name: (name: string): boolean => {
    return name.trim().length >= 3;
  },

  message: (message: string): boolean => {
    return message.trim().length >= 10;
  },
};

export const getValidationError = (field: string, value: string): string | null => {
  switch (field) {
    case 'name':
      return !validators.name(value) ? 'Nome deve ter pelo menos 3 caracteres' : null;
    case 'email':
      return !validators.email(value) ? 'Email inválido' : null;
    case 'phone':
      return value && !validators.phone(value) ? 'Telefone inválido' : null;
    case 'message':
      return !validators.message(value) ? 'Mensagem deve ter pelo menos 10 caracteres' : null;
    default:
      return null;
  }
};
```

---

## 🧪 TESTES

```bash
# Formulário
☑ Todos inputs renderizam
☑ Placeholder exibe
☑ Focus funciona
☑ Typing atualiza estado

# Validação
☑ Nome obrigatório
☑ Email validado
☑ Telefone opcional
☑ Assunto obrigatório
☑ Mensagem obrigatória
☑ Privacy checkbox obrigatório

# Erro Handling
☑ Erros exibem em vermelho
☑ Erros desaparecem ao corrigir
☑ Submit disabled se errros
☑ Erro de servidor mostra mensagem

# Success
☑ Submit sucede
☑ Success message exibe
☑ Form limpa
☑ API chamada corretamente

# Responsividade
☑ Mobile: form 1 coluna
☑ Desktop: form + info lado a lado
☑ Inputs responsive
☑ Labels legíveis
```

---

## 📊 CHECKLIST

```
COMPONENTES:
☑ Input criado
☑ Textarea criado
☑ Select criado
☑ Checkbox criado
☑ ContactForm criado

PÁGINA:
☑ /contato completa
☑ Form funciona
☑ Info contato exibe
☑ FAQ section

INTEGRAÇÃO:
☑ API lead endpoint
☑ Form submete
☑ Validação frontend OK
☑ Error handling OK

QUALIDADE:
☑ Responsivo
☑ Acessível
☑ TypeScript ok
☑ Performance OK
```

---

**Próximo: DESENVOLVIMENTO_PAGINA_SOBRE.md** 🚀
