<template>
  <div>
    <div class="text-sm">
      <img src="../assets/images/logo.png" class="h-12 " />

      <div class="my-2">
          <strong>Barstaat</strong><br />
          {{ barSession.type.name }}<br />
          {{ barSession.date | moment('DD-MM-YYYY') }}<br />
          Open: {{ barSession.originalAuthorName }}<br />
          Sluit: {{ barSession.closingAuthorName }}
      </div>

      <div style="my-2">
          <strong>Totalen - Daadwerkelijke Omzet</strong>
          <table class="w-full">
            <tbody>
              <tr>
                <td>PIN Apparaat Omzet<sup>5</sup></td>
                <td class="text-right">{{ barSession.actualPinTotal | currency }}</td>
              </tr>
              <tr>
                <td>Contant Omzet</td>
                <td class="text-right">{{ barSession.cashAtEnd.total() - barSession.cashAtStart.total() | currency }}</td>
              </tr>
              <tr>
                <td class="border-t border-black">Daadwerkelijke Omzet<sup>7</sup></td>
                <td class="border-t border-black text-right">{{ barSession.actualPinTotal + barSession.cashAtEnd.total() - barSession.cashAtStart.total() | currency }}</td>
              </tr>
            </tbody>
          </table>

          <strong>Totalen - Theoretische Omzet</strong>
          <table class="w-full">
            <tbody>
              <tr>
                <td>Kassa Contant</td>
                <td class="text-right">{{ barSession.posCashTotal | currency }}</td>
              </tr>
              <tr>
                <td>Kassa PIN</td>
                <td class="text-right">{{ barSession.posPinTotal | currency }}</td>
              </tr>
              <tr>
                <td class="border-t border-black">Theoretische Omzet<sup>2</sup></td>
                <td class="border-t border-black text-right">{{ barSession.posCashTotal + barSession.posPinTotal | currency }}</td>
              </tr>
            </tbody>
          </table>

          <strong>Totalen - Overig</strong>
          <table class="w-full">
            <tbody>
              <tr>
                <td>Personeel<sup>3</sup></td>
                <td class="text-right">{{ barSession.posFreeTotal | currency }}</td>
              </tr>
              <tr>
                <td class="border-t border-black border-dashed">Naar Kassalade Kluis<sup>4</sup></td>
                <td class="border-t border-black border-dashed text-right">{{ barSession.cashToSafe.remainingCashInDrawer(true) | currency }}</td>
              </tr>
              <tr>
                <td>Naar Grijze Kluis<sup>6</sup></td>
                <td class="text-right">{{ barSession.cashToSafe.total() | currency }}</td>
              </tr>
              <tr>
                <td class="border-t border-black border-dashed">Contant Begin<sup>1</sup></td>
                <td class="border-t border-black border-dashed text-right">{{ barSession.cashAtStart.total() | currency }}</td>
              </tr>
              <tr>
                <td>Contant Eind</td>
                <td class="text-right">{{ barSession.cashAtEnd.total() | currency }}</td>
              </tr>
            </tbody>
          </table>
      </div>

      <div v-for="{name, contents} in cashStates" :key="name">
          <div>
              <strong>{{ name }}</strong>
          </div>
          <table class="w-full">
              <tr v-for="bill in contents.bills" :key="bill.amount">
                  <td>{{ bill.count }}</td>
                  <td>x {{ bill.amount | currency }}</td>
                  <td class="text-right">{{ bill.total() | currency }}</td>
              </tr>
              <tr v-if="contents.supportsEmergencyCash()"> 
                  <td colspan="2">Noodwisselgeld</td>
                  <td class="text-right">{{ contents.emergencyCash | currency }}</td>
              </tr>
              <tr>
                  <td colspan="2">Totaal</td>
                  <td class="text-right border-t border-black">{{ contents.total() | currency }}</td>
              </tr>
          </table>
      </div>

      <div class="mt-8 text-center w-full italic">Put this ticket in the envelope for the grey safe.</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['barSession'],
  data () {
    return {
      cashStates: [
        { name: 'Contant - Begin', contents: this.barSession.cashAtStart },
        { name: 'Contant - Eind', contents: this.barSession.cashAtEnd },
        { name: 'Naar Grijze Kluis', contents: this.barSession.cashToSafe }
      ]
    }
  }
}
</script>
