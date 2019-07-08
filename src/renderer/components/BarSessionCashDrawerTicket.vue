<template>
  <div>
      <div class="text-sm">
        <img src="../assets/images/logo.png" class="h-12 " />

        <div class="my-2">
            <strong>Cash Drawer Contents</strong><br />
            Last use: {{ barSession.date | moment('DD-MM-YYYY') }}<br />
            Closed by: {{ barSession.closingAuthorName }}
        </div>

        <table class="w-full">
            <tr v-for="(bill, billKey) in barSession.cashAtEnd.bills" :key="bill.amount">
                <td>{{ bill.count - barSession.cashToSafe.bills[billKey].count }}</td>
                <td>x {{ bill.amount | currency }}</td>
                <td class="text-right">{{ bill.total() - barSession.cashToSafe.bills[billKey].total() | currency }}</td>
            </tr>
            <tr v-if="barSession.cashAtEnd.supportsEmergencyCash()"> 
                <td colspan="2">Emergency Cash</td>
                <td class="text-right">{{ barSession.cashAtEnd.emergencyCash | currency }}</td>
            </tr>
            <tr>
                <td colspan="2">Total</td>
                <td class="text-right border-t border-black">{{ barSession.cashToSafe.remainingCashInDrawer(true) | currency }}</td>
            </tr>
        </table>

        <div class="mt-8 text-center w-full italic">Put this ticket in the cash drawer.</div>
      </div>
  </div>
</template>

<script>
export default {
  props: ['barSession']
}
</script>
