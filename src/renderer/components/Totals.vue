<template>
  <div>
    <table class="w-full">
      <tbody>
        <tr>
          <td class="label">Eindtotaal Cash</td>
          <td class="value text-right">&euro; {{ barSession.finalCashState.total() | currency('') }}</td>
        </tr>
        <tr>
          <td class="label">Begintotaal Cash</td>
          <td class="value text-right">&euro; {{ barSession.initialCashState.total() | currency('') }}</td>
        </tr>
        <tr>
          <td class="label">Opbrengst Cash</td>
          <td class="value text-right">&euro; {{ barSession.cashDifferenceTotal() | currency('') }}</td>
        </tr>
        <tr>
          <td class="label">Totaal PIN</td>
          <td class="mutable-value text-right">
            <money-input v-if="mutable" v-model.number="barSession.pinTerminalTotal" class="form-input bg-white w-32 text-right"></money-input>
            <div v-else>&euro; {{ barSession.pinTerminalTotal | currency('') }}</div>
          </td>
        </tr>

        <tr>
          <td class="label">Kassa - Personeel</td>
          <td class="mutable-value text-right">
            <money-input v-if="mutable" v-model.number="barSession.theoreticalCashRegisterStaffTotal" class="form-input bg-white w-32 text-right"></money-input>
            <div v-else>&euro; {{ barSession.theoreticalCashRegisterStaffTotal | currency('') }}</div>
          </td>
        </tr>
        <tr v-if="mutable">
          <td colspan="2" class="label"><small>Bedrag bovenaan de bon achter 'Gratis'</small></td>
        </tr>

        <tr>
          <td class="label">Kassa - Totaal</td>
          <td class="mutable-value text-right">
            <money-input v-if="mutable" v-model.number="barSession.theoreticalCashRegisterTotal" class="form-input bg-white w-32 text-right"></money-input>
            <div v-else>&euro; {{ barSession.theoreticalCashRegisterTotal | currency('') }}</div>
          </td>
        </tr>
        <tr v-if="mutable">
          <td colspan="2" class="label"><small>Bedrag onderaan de bon achter 'Totals'</small></td>
        </tr>

        <tr>
          <td class="label">Totale omzet volgens kassa</td>
          <td class="value text-right">&euro; {{ barSession.theoreticalCashRegisterRevenue() | currency('') }}</td>
        </tr>

        <tr>
          <td class="label" colspan="2"></td>
        </tr>

        <tr>
          <td class="label">Daadwerkelijke totale omzet</td>
          <td class="value text-right">&euro; {{ barSession.revenueTotal() | currency('') }}</td>
        </tr>
        <tr>
          <td class="label">Naar grijze kluis</td>
          <td class="value text-right">&euro; {{ barSession.effluentTotal() | currency('') }}</td>
        </tr>
        <tr>
          <td class="label">Naar wisselkas</td>
          <td class="value text-right">&euro; {{ barSession.changeSafeTotal() | currency('') }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import MoneyInput from '@/components/MoneyInput'

export default {
  props: { barSession: {}, mutable: { default: true } },
  components: {
    'money-input': MoneyInput
  }
}
</script>

<style lang="postcss" scoped>
@media not print {
  .label {
    color: #596a73;
    margin: 2em 0;
  }

  .value {
    padding: 0.5em 1em 0.5em 0em;
  }

  .mutable-value {
    padding: 0.5em 1em 0em 0em;
  }
}
</style>
