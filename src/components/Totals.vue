<template>
  <div>
    <table>
      <tbody>
        <tr>
          <td>Aangeslagen Cash</td>
          <td><input type="text" v-model.number="barSession.theoreticalCashTotal"></td>
        </tr>
        <tr>
          <td>Aangeslagen PIN</td>
          <td><input type="text" v-model.number="barSession.theoreticalPinTotal"></td>
        </tr>
        <tr>
          <td>Getelde Cash</td>
          <td>{{ barSession.cashDifferenceTotal() }}</td>
        </tr>
        <tr>
          <td>Totaal PIN-terminal</td>
          <td><input type="text" v-model.number="barSession.pinTerminalTotal"></td>
        </tr>
        <tr>
          <td>Totale omzet</td>
          <td>{{ barSession.revenueTotal() }}</td>
        </tr>
        <tr>
          <td>Naar grijze kluis</td>
          <td>{{ barSession.effluentTotal() }}</td>
        </tr>
        <tr>
          <td>Naar wisselkas</td>
          <td>{{ barSession.changeSafeTotal() }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ['barSession']
}
</script>
