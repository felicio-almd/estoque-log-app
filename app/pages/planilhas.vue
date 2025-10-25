<script setup lang="ts">
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { ref } from 'vue'

definePageMeta({
  layout: 'dashboard',
})

interface Item {
  quantidade: number
  produto: string
  valorUnitario: number
  expanded: boolean
}

interface Moto {
  modelo: string
}

const nomeCliente = ref<string>('')
const dataAtual = ref(new Date().toLocaleDateString('pt-BR'))
const motos = ref<Moto[]>([{ modelo: '' }])
const itens = ref<Item[]>([])

function adicionarMoto() {
  motos.value.push({ modelo: '' })
}

function removerMoto(index: number) {
  if (motos.value.length > 1) {
    motos.value.splice(index, 1)
  }
}

function adicionarItem() {
  itens.value.push({
    quantidade: 1,
    produto: '',
    valorUnitario: 0,
    expanded: false,
  })
}

function removerItem(index: number) {
  itens.value.splice(index, 1)
}

function toggleItem(index: number) {
  const item = itens.value[index]
  if (item) {
    item.expanded = !item.expanded
  }
}

function calcularValorTotal(item: Item): number {
  return item.quantidade * item.valorUnitario
}

function formatarValor(valor: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valor)
}

function calcularTotalGeral(): number {
  return itens.value.reduce((acc, item) => acc + calcularValorTotal(item), 0)
}

function calcularQuantidadeTotal(): number {
  return itens.value.reduce((acc, item) => acc + item.quantidade, 0)
}

function calcularSomatorioUnitario(): number {
  return itens.value.reduce((acc, item) => acc + item.valorUnitario, 0)
}

function gerarPDFBlob(): Blob {
  const doc = new jsPDF()

  doc.setFont('helvetica', 'bold')

  doc.setFontSize(20)
  doc.text('ORÇAMENTO - NEY MOTOS', 105, 20, { align: 'center' })

  doc.setFontSize(14)
  doc.text(nomeCliente.value || 'Nome do Cliente', 14, 35)

  doc.setFontSize(12)
  doc.text(dataAtual.value, 180, 35)

  let yPosition = 45
  if (motos.value.length > 0 && motos.value[0].modelo) {
    doc.setFontSize(12)
    doc.setFont('helvetica', 'bold')
    doc.text('MOTO:', 14, yPosition)
    doc.setFont('helvetica', 'normal')
    yPosition += 7
    motos.value.forEach((moto, index) => {
      if (moto.modelo) {
        doc.setFont('helvetica', 'normal')
        doc.text(`${index + 1}. ${moto.modelo}`, 14, yPosition)
        yPosition += 7
      }
    })
    yPosition += 3
  }

  const tableData = itens.value.map(item => [
    item.quantidade.toString(),
    item.produto,
    formatarValor(item.valorUnitario),
    formatarValor(calcularValorTotal(item)),
  ])

  tableData.push([
    `TOTAL ${calcularQuantidadeTotal()}`,
    '',
    formatarValor(calcularSomatorioUnitario()),
    formatarValor(calcularTotalGeral()),
  ])

  autoTable(doc, {
    startY: yPosition,
    head: [['Quantidade', 'Produto', 'Valor (unidade)', 'Valor (Total)']],
    body: tableData,
    theme: 'grid',
    headStyles: {
      fillColor: [255, 255, 255],
      textColor: [0, 0, 0],
      fontStyle: 'bold',
      lineWidth: 0.5,
      lineColor: [0, 0, 0],
      halign: 'center',
    },
    bodyStyles: {
      textColor: [0, 0, 0],
      lineWidth: 0.5,
      lineColor: [0, 0, 0],
    },
    columnStyles: {
      0: { halign: 'center', cellWidth: 25 },
      1: { halign: 'left', cellWidth: 80 },
      2: { halign: 'right', cellWidth: 40 },
      3: { halign: 'right', cellWidth: 40 },
    },
    didParseCell(data) {
      if (data.row.index === tableData.length - 1) {
        data.cell.styles.fontStyle = 'bold'
      }
    },
  })

  // Retornar o PDF como Blob
  return doc.output('blob')
}

async function compartilharWhatsApp() {
  try {
    const pdfBlob = gerarPDFBlob()
    const nomeArquivo = `Orcamento_${nomeCliente.value.replace(/\s+/g, '_')}_${new Date().getTime()}.pdf`

    const file = new File([pdfBlob], nomeArquivo, { type: 'application/pdf' })

    if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({
        files: [file],
        title: 'Orçamento - Ney Motos',
        text: `Orçamento para ${nomeCliente.value || 'Cliente'}`,
      })
    }
    else {
      const url = URL.createObjectURL(pdfBlob)
      const a = document.createElement('a')
      a.href = url
      a.download = nomeArquivo
      a.click()
      URL.revokeObjectURL(url)

      alert('PDF baixado! Agora você pode:\n\n1. Abrir o WhatsApp\n2. Selecionar o contato\n3. Clicar no ícone de anexo (📎)\n4. Escolher o arquivo baixado')
    }
  }
  catch (error) {
    console.error('Erro ao compartilhar:', error)
    alert('Não foi possível compartilhar. O PDF será baixado.')
    exportarTudo()
  }
}

function exportarTudo() {
  const doc = new jsPDF()

  doc.setFont('helvetica', 'bold')

  doc.setFontSize(20)
  doc.text('ORÇAMENTO - NEY MOTOS', 105, 20)

  doc.setFontSize(14)
  doc.text(nomeCliente.value || 'Nome do Cliente', 14, 35)

  doc.setFontSize(12)
  doc.text(dataAtual.value, 180, 20)

  let yPosition = 40
  if (motos.value.length > 0 && motos.value[0].modelo) {
    doc.setFontSize(12)
    doc.text('MOTO:', 14, yPosition)
    yPosition += 7
    motos.value.forEach((moto, index) => {
      if (moto.modelo) {
        doc.setFont('helvetica', 'normal')
        doc.text(`${index + 1}. ${moto.modelo}`, 14, yPosition)
        yPosition += 7
      }
    })
    yPosition += 3
  }

  const tableData = itens.value.map(item => [
    item.quantidade.toString(),
    item.produto,
    formatarValor(item.valorUnitario),
    formatarValor(calcularValorTotal(item)),
  ])

  tableData.push([
    `TOTAL: ${calcularQuantidadeTotal()}`,
    '',
    formatarValor(calcularSomatorioUnitario()),
    formatarValor(calcularTotalGeral()),
  ])

  autoTable(doc, {
    startY: yPosition,
    head: [['Quantidade', 'Produto', 'Valor (unidade)', 'Valor (Total)']],
    body: tableData,
    theme: 'grid',
    headStyles: {
      fillColor: [255, 255, 255],
      textColor: [0, 0, 0],
      fontStyle: 'bold',
      lineWidth: 0.5,
      lineColor: [0, 0, 0],
      halign: 'center',
    },
    bodyStyles: {
      textColor: [0, 0, 0],
      lineWidth: 0.5,
      lineColor: [0, 0, 0],
    },
    columnStyles: {
      0: { halign: 'center', cellWidth: 25 },
      1: { halign: 'left', cellWidth: 80 },
      2: { halign: 'right', cellWidth: 40 },
      3: { halign: 'right', cellWidth: 40 },
    },
    didParseCell(data) {
      if (data.row.index === tableData.length - 1) {
        data.cell.styles.fontStyle = 'bold'
      }
    },
  })

  const nomeArquivo = `Orcamento_${nomeCliente.value.replace(/\s+/g, '_')}_${new Date().getTime()}.pdf`
  doc.save(nomeArquivo)
}
</script>

<template>
  <div class="max-w-3xl mx-auto text-black">
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div class="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
        <button
          class="p-2 hover:bg-gray-100 rounded-lg transition-colors text-center flex items-center"
          @click="$router.back()"
        >
          <Icon name="i-heroicons-arrow-left" class="w-5 h-5" />
        </button>
        <h1 class="text-xl font-semibold text-black">
          Cadastrar Nota
        </h1>
      </div>

      <div class="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label class="block text-sm font-medium text-black mb-2">
            Nome do Cliente*
          </label>
          <input
            v-model="nomeCliente"
            type="text"
            placeholder="Digite o nome do cliente"
            class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          >
        </div>
        <div>
          <label class="block text-sm font-medium text-black mb-2">
            Data
          </label>
          <input
            v-model="dataAtual"
            type="text"
            class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          >
        </div>
      </div>

      <div class="mb-6">
        <label class="block text-sm font-medium text-black mb-2">
          Motos
        </label>
        <div class="space-y-3">
          <div
            v-for="(moto, index) in motos"
            :key="index"
            class="flex gap-2"
          >
            <input
              v-model="moto.modelo"
              type="text"
              :placeholder="`Modelo da moto ${index + 1}`"
              class="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            >
            <button
              v-if="motos.length > 1"
              class="px-4 py-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              @click="removerMoto(index)"
            >
              <Icon name="i-heroicons-trash" class="w-5 h-5" />
            </button>
          </div>
        </div>
        <button
          class="mt-3 flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium text-sm"
          @click="adicionarMoto"
        >
          <Icon name="i-heroicons-plus" class="w-4 h-4" />
          Adicionar Moto
        </button>
      </div>

      <div class="mb-8">
        <h3 class="text-base font-semibold text-gray-900 mb-4">
          Itens
        </h3>
        <div class="space-y-2">
          <div
            v-for="(item, index) in itens"
            :key="index"
            class="border border-gray-200 rounded-lg overflow-hidden"
          >
            <div
              class="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
              @click="toggleItem(index)"
            >
              <div class="flex items-center gap-3">
                <span class="font-medium text-gray-900">
                  {{ item.quantidade }}x {{ item.produto || 'Novo Item' }}
                </span>
              </div>
              <div class="flex items-center gap-3">
                <span class="text-sm text-gray-600">
                  Valor Total: <span class="font-semibold text-gray-900">{{ formatarValor(calcularValorTotal(item)) }}</span>
                </span>
                <Icon
                  :name="item.expanded ? 'i-heroicons-chevron-up' : 'i-heroicons-chevron-down'"
                  class="w-5 h-5 text-gray-400"
                />
              </div>
            </div>

            <div v-if="item.expanded" class="p-4 pt-0 border-t border-gray-100">
              <div class="grid grid-cols-3 gap-4">
                <div>
                  <label class="block text-xs font-medium text-gray-600 mb-1">
                    Quantidade
                  </label>
                  <input
                    v-model.number="item.quantidade"
                    type="number"
                    min="1"
                    class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  >
                </div>
                <div class="col-span-2">
                  <label class="block text-xs font-medium text-gray-600 mb-1">
                    Nome do Produto
                  </label>
                  <input
                    v-model="item.produto"
                    type="text"
                    placeholder="Ex: ARVORE COMANDO"
                    class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  >
                </div>
                <div class="col-span-3">
                  <label class="block text-xs font-medium text-gray-600 mb-1">
                    Valor Unitário (R$)
                  </label>
                  <input
                    v-model.number="item.valorUnitario"
                    type="number"
                    step="0.01"
                    min="0"
                    class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  >
                </div>
              </div>
              <button
                class="mt-3 text-sm text-red-600 hover:text-red-700 font-medium"
                @click.stop="removerItem(index)"
              >
                Remover Item
              </button>
            </div>
          </div>
        </div>

        <button
          class="mt-3 flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium text-sm"
          @click="adicionarItem"
        >
          <Icon name="i-heroicons-plus" class="w-4 h-4" />
          Adicionar Item
        </button>

        <!-- Resumo -->
        <div class="mt-6 p-4 bg-gray-50 rounded-lg">
          <div class="flex justify-between text-sm mb-2">
            <span class="text-gray-600">Total de Itens:</span>
            <span class="font-semibold">{{ calcularQuantidadeTotal() }}</span>
          </div>
          <div class="flex justify-between text-lg font-bold border-t border-gray-300 pt-2">
            <span>TOTAL GERAL:</span>
            <span class="text-blue-600">{{ formatarValor(calcularTotalGeral()) }}</span>
          </div>
        </div>
      </div>

      <div class="flex gap-2 max-md:flex-col justify-center pt-6 border-t border-gray-200">
        <button
          class="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-sm"
          @click="exportarTudo"
        >
          <Icon name="i-heroicons-arrow-down-tray" class="w-5 h-5" />
          Exportar PDF
        </button>
        <button
          class="flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors shadow-sm"
          @click="compartilharWhatsApp"
        >
          <Icon name="i-heroicons-chat-bubble-left-right" class="w-5 h-5" />
          Compartilhar WhatsApp
        </button>
      </div>
    </div>
  </div>
</template>
