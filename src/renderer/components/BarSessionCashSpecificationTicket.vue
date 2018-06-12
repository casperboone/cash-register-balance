<template>
    <div>
        <img src="../assets/images/logo.png" class="h-12 " />

        <div style="margin: 35px 0;">
            <strong>Inhoudsspecificatie Kassalade</strong><br />
            Laatste gebruik:<br />
            {{ barSession.type.name }}<br />
            {{ moment(barSession.date).format('DD-MM-YYYY') }}
        </div>

       
            <table style="width: 100%;" border="1">
                <tr v-for="(bill, billKey) in grossBills" :key="bill.amount">
                    <td>
                        {{ bill.count - subtractBills[billKey].count }}
                    </td>
                    <td>
                         x &euro; {{ bill.amount | currency('') }}
                    </td>
                    <td style="text-align: right;">
                        &euro; {{ bill.total() - subtractBills[billKey].total() | currency('') }}
                    </td>
                </tr>
                <tr>
                    <td colspan="2">Noodwisselgeld</td>
                    <td style="text-align: right;">&euro; {{ grossState.emergencyCash - subtractState.emergencyCash | currency('') }}</td>
                </tr>
                <tr>
                    <td colspan="2">Totaal</td>
                    <td style="text-align: right; border-top: 1px solid;">&euro; {{ grossState.total() - subtractState.total() | currency('') }}</td>
                </tr>
            </table>
            <br />
            <br />
            <strong>LET OP: Voeg deze bon bij kassalade</strong>
    </div>
</template>

<script>
import Totals from '@/components/Totals.vue'

export default {
  props: ['barSession', 'cashStates'],
  data () {
    return {
      moment: window.moment
    }
  },
  computed: {
    grossState () {
      return this.cashStates[1].cashState()
    },
    subtractState () {
      return this.cashStates[2].cashState()
    },
    grossBills () {
      return this.cashStates[1].cashState().bills
    },
    subtractBills () {
      return this.cashStates[2].cashState().bills
    }
  },
  components: {
    'totals': Totals
  }
}
</script>
