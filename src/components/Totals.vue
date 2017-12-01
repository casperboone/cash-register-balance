<template>
  <div>
    <table class="w-full">
      <tbody>
        <tr>
          <td class="text-grey-darker my-2">Aangeslagen cash</td>
          <td class="py-2 text-right"><input type="text" v-model.number="barSession.theoreticalCashTotal" class="form-input bg-white w-32 text-right"></td>
        </tr>
        <tr>
          <td class="text-grey-darker my-2">Aangeslagen PIN</td>
          <td class="py-2 text-right"><input type="text" v-model.number="barSession.theoreticalPinTotal" class="form-input bg-white w-32 text-right"></td>
        </tr>
        <tr>
          <td class="text-grey-darker my-2">Getelde cash</td>
          <td class="py-2 text-right pr-4">{{ barSession.cashDifferenceTotal() | currency('') }}</td>
        </tr>
        <tr>
          <td class="text-grey-darker">Totaal PIN-terminal</td>
          <td class="py-2 text-right">
            <money-input v-model.number="barSession.pinTerminalTotal" class="form-input bg-white w-32 text-right"></money-input>
          </td>
        </tr>
        <tr>
          <td class="text-grey-darker">Totale omzet</td>
          <td class="py-2 text-right pr-4">{{ barSession.revenueTotal() | currency('') }}</td>
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
