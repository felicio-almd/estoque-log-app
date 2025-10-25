# Sistema de Gestão Mecanica - V1
##📋 MVP - Sistema de Orçamentos

> Solução web moderna para criação rápida de orçamentos profissionais em PDF, sem necessidade de Excel ou ferramentas complicadas.

## 🎯 O Problema

Pequenas e médias empresas, especialmente oficinas mecânicas e prestadores de serviço, enfrentam desafios diários ao criar orçamentos:

- ❌ **Excel complicado**: Fórmulas, formatação e configuração trabalhosa
- ❌ **Tempo perdido**: Abrir planilhas, ajustar células, salvar em PDF
- ❌ **Inconsistência**: Cada orçamento sai de um jeito diferente
- ❌ **Mobilidade zero**: Precisa de computador com Excel instalado
- ❌ **Compartilhamento difícil**: Converter para PDF, baixar, anexar no WhatsApp...

## ✨ A Solução

Um sistema web simples, rápido e profissional que permite:

✅ **Criar orçamentos em segundos** - Interface intuitiva e objetiva  
✅ **Acessar de qualquer lugar** - Funciona em celular, tablet ou computador  
✅ **Gerar PDF automático** - Um clique e está pronto  
✅ **Compartilhar facilmente** - Botão direto para WhatsApp  
✅ **Visual profissional** - Orçamentos padronizados e bem formatados  
✅ **Sem instalação** - Basta abrir o navegador  

## 🚀 Funcionalidades

### 📝 Cadastro Completo
- Nome do cliente
- Data automática (editável)
- Múltiplas motos/veículos
- Lista de itens com quantidade e valores

### 🧮 Cálculos Automáticos
- Valor total por item (quantidade × valor unitário)
- Somatório de todos os itens
- Total geral do orçamento
- Resumo visual em tempo real

### 📄 Geração de PDF
- Cabeçalho profissional com nome da empresa
- Tabela formatada com bordas
- Valores em real (R$)
- Nome automático do arquivo
- Layout limpo e legível

### 📱 Compartilhamento
- Botão de download direto
- Opção de compartilhar no WhatsApp
- Funciona em mobile e desktop

## 🛠️ Tecnologias

- **Nuxt 3** - Framework Vue.js moderno e performático
- **TypeScript** - Tipagem estática para código mais seguro
- **Tailwind CSS** - Estilização rápida e responsiva
- **jsPDF** - Geração de PDFs no navegador
- **jsPDF-AutoTable** - Tabelas formatadas em PDF

## 📦 Instalação

```bash
# Clone o repositório
git clone [seu-repositorio]

# Entre na pasta
cd orcamento-ney-motos

# Instale as dependências
npm install

# Execute em desenvolvimento
npm run dev
```

Acesse `http://localhost:3000`

## 🎨 Como Usar

1. **Preencha os dados do cliente**
   - Nome do cliente
   - Data (preenchida automaticamente)

2. **Adicione as motos** (opcional)
   - Clique em "Adicionar Moto"
   - Digite o modelo/placa

3. **Cadastre os itens**
   - Clique em "Adicionar Item"
   - Expanda o item para editar
   - Informe: quantidade, nome do produto e valor unitário
   - O valor total é calculado automaticamente

4. **Revise o orçamento**
   - Veja o resumo com total de itens e valor geral
   - Edite qualquer informação se necessário

5. **Exporte ou Compartilhe**
   - **Exportar PDF**: Baixa o orçamento formatado
   - **Compartilhar WhatsApp**: Facilita o envio para clientes

## 📱 Uso Mobile

O sistema é totalmente responsivo e funciona perfeitamente em smartphones:

- Interface adaptada para telas pequenas
- Botões grandes e fáceis de tocar
- Campos de formulário otimizados
- Compartilhamento nativo do celular

## 🎯 Casos de Uso

### Oficinas Mecânicas
Criar orçamentos rápidos para clientes enquanto inspeciona o veículo.

### Assistências Técnicas
Listar peças e serviços necessários com valores transparentes.

### Prestadores de Serviço
Qualquer profissional que precise fazer cotações rápidas e profissionais.

### Vendas no Balcão
Atender clientes presencialmente e enviar o orçamento na hora.

## 🔒 Privacidade

- Nenhum dado é armazenado em servidor
- Tudo funciona no navegador do usuário
- Sem necessidade de login ou cadastro
- PDFs gerados localmente

## 🚀 Melhorias Futuras

- [ ] Salvar orçamentos localmente (histórico)
- [ ] Templates customizáveis
- [ ] Logo da empresa personalizada
- [ ] Múltiplas moedas
- [ ] Desconto e acréscimos
- [ ] Envio automático por email
- [ ] Versão PWA (instalar como app)

## 📄 Licença

Este projeto está sob a licença MIT.

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer um fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abrir um Pull Request

## 💡 Dicas de Uso

**Para melhor experiência:**
- Use Chrome ou Edge nos celulares Android
- Use Safari no iPhone/iPad
- Mantenha o navegador atualizado
- Permita downloads automáticos

**Produtividade:**
- Crie templates com itens mais usados
- Mantenha uma lista de preços atualizada à mão
- Use descrições padronizadas para facilitar

## 📞 Suporte

Encontrou algum problema ou tem alguma sugestão? Abra uma issue no GitHub!

---

**Desenvolvido para facilitar o dia a dia de quem trabalha e não tem tempo a perder com planilhas complicadas.** 🚀
