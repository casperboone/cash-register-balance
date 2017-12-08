<template>
  <div>
    <table class="w-full">
      <tbody>
      <tr>
        <td class="text-grey-darker my-2">Eindtotaal Cash</td>
        <td class="py-2 text-right pr-4">{{ barSession.finalCashState.total() | currency('') }}</td>
      </tr>
      <tr>
        <td class="text-grey-darker my-2">Begintotaal Cash</td>
        <td class="py-2 text-right pr-4">{{ barSession.initialCashState.total() | currency('') }}</td>
      </tr>
      <tr>
        <td class="text-grey-darker my-2">Opbrengst Cash</td>
        <td class="py-2 text-right pr-4">{{ barSession.cashDifferenceTotal() | currency('') }}</td>
      </tr>
      <tr>
        <td class="text-grey-darker my-2">Totaal PIN</td>
        <td class="py-2 text-right">
          <money-input v-model.number="barSession.pinTerminalTotal" class="form-input bg-white w-32 text-right"></money-input>
        </td>
      </tr>
      <tr>
        <td class="text-grey-darker my-2">Opbrengst</td>
        <td class="py-2 text-right pr-4">{{ barSession.revenueTotal() | currency('') }}</td>
      </tr>

      <tr>
        <td class="text-grey-darker my-2" colspan="2">Vul hieronder het bedrag CATL (plus CKTL) op de kassabon in.</td>
      </tr>


      <tr>
        <td class="text-grey-darker my-2">Kassa aangeslagen</td>
        <td class="py-2 text-right"><input type="text" v-model.number="barSession.theoreticalCashTotal" class="form-input bg-white w-32 text-right"></td>
      </tr>

      <tr>
        <td class="text-grey-darker my-2" colspan="2"></td>
      </tr>

      <tr>
        <td class="text-grey-darker">Totale omzet</td>
        <td class="py-2 text-right pr-4">{{ barSession.finalCashState.total() | currency('') }}</td>
      </tr>
      <tr>
        <td class="text-grey-darker">Naar grijze kluis</td>
        <td class="py-2 text-right pr-4">{{ barSession.effluentTotal() | currency('') }}</td>
      </tr>
      <tr>
        <td class="text-grey-darker">Naar wisselkas</td>
        <td class="py-2 text-right pr-4">{{ barSession.changeSafeTotal() | currency('') }}</td>
      </tr>

      </tbody>
    </table>
  </div>
</template>

<script>
import MoneyInput from '@/components/MoneyInput'

export default {
  props: ['barSession'],
  components: {
    'money-input': MoneyInput
  }
}
</script>
