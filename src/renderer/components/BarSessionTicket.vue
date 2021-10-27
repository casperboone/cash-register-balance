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
                <td>Vast PIN Apparaat<sup>5</sup></td>
                <td class="text-right">{{ barSession.actualFixedPinTotal | currency }}</td>
              </tr>
              <tr>
                <td>Mobiel PIN Apparaat<sup>5</sup></td>
                <td class="text-right">{{ barSession.actualMobilePinTotal | currency }}</td>
              </tr>
              <tr>
                <td class="border-t border-black">Daadwerkelijke Omzet<sup>7</sup></td>
                <td class="border-t border-black text-right">{{ barSession.actualTotal() | currency }}</td>
              </tr>
            </tbody>
          </table>

          <strong>Totalen - Theoretische Omzet</strong>
          <table class="w-full">
            <tbody>
              <tr>
                <td>Kassa PIN</td>
                <td class="text-right">{{ barSession.posPinTotal | currency }}</td>
              </tr>
              <tr>
                <td class="border-t border-black">Theoretische Omzet<sup>2</sup></td>
                <td class="border-t border-black text-right">{{ barSession.theoreticalTotal() | currency }}</td>
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
            </tbody>
          </table>
      </div>

      <div class="mt-8 text-center w-full italic">Put this ticket in the envelope for the grey safe.</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['barSession']
}
</script>
