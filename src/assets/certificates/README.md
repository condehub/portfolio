# /assets/certificates — Certificados em PDF

Coloque aqui os PDFs dos certificados dos cursos concluídos,
vinculados pelo link "Ver certificado →" na seção **Certificações**.

> Esta pasta guarda os **certificados** (documentos). Os **logos** das
> plataformas/instituições ficam em `assets/icons/certs/`.

## Convenção de nomes

Use o nome do curso em minúsculas, sem espaços ou acentos, seguido da
instituição:

| Arquivo | Curso |
|---|---|
| `cybersecurity-cisco.pdf` | Fundamentos de Cibersegurança — Cisco |
| `claude-code-in-action-anthropic.pdf` | Claude Code in Action — Anthropic |
| `logica-de-programacao-ensinadev.pdf` | Lógica de Programação — Ensina Dev |

## Como integrar

No card correspondente em `index.html`, adicione:

```html
<a href="assets/certificates/nome-do-certificado.pdf" target="_blank" rel="noopener" class="cert-card__link">
  Ver certificado →
</a>
```
