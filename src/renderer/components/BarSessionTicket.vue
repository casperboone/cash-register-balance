<template>
    <div>
        <img src="../assets/images/logo.png" class="h-12 " />

        <div style="margin: 35px 0;">
            <strong>Barstaat</strong><br />
            {{ barSession.type.name }}<br />
            {{ moment(barSession.date).format('DD-MM-YYYY') }}
        </div>

        <div v-for="cashStateForm in cashStates" :key="cashStateForm.title">
            <div>
                <strong>{{ cashStateForm.title }}</strong>
            </div>
            <div>
                <em>{{ cashStateForm.cashState().author }}</em>
            </div>
            <table style="width: 100%;" border="1">
                <tr v-for="bill in cashStateForm.cashState().bills" :key="bill.amount">
                    <td>
                        {{ bill.count }}
                    </td>
                    <td>
                         x &euro; {{ bill.amount | currency('') }}
                    </td>
                    <td style="text-align: right;">
                        &euro; {{ bill.total() | currency('') }}
                    </td>
                </tr>
                <tr>
                    <td colspan="2">Noodwisselgeld</td>
                    <td style="text-align: right;">&euro; {{ cashStateForm.cashState().emergencyCash | currency('') }}</td>
                </tr>
                <tr>
                    <td colspan="2">Totaal</td>
                    <td style="text-align: right; border-top: 1px solid;">&euro; {{ cashStateForm.cashState().total() | currency('') }}</td>
                </tr>
            </table>
        </div>
        
        <div style="margin: 30px 0;">
            <strong>Totalen</strong>
            <totals :bar-session="barSession" :mutable="false"></totals>
        </div>
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
  components: {
    'totals': Totals
  }
}
</script>
