<template>
  <div>
    <v-container>
      <h1>Detail Page</h1>
      <v-btn color="primary" @click="goBack">Back</v-btn>
      <v-form>
        <v-text-field label="Index" v-model="item.idx" readonly></v-text-field>
        <v-text-field label="Supplier" v-model="item.Supplier"></v-text-field>
        <v-text-field label="Region" v-model="item.Region"></v-text-field>
        <v-text-field label="Company Name" v-model="item.CompanyName"></v-text-field>
        <v-text-field label="Employer Website" v-model="item.EmployerWebsite"></v-text-field>
        <v-text-field label="Business Type" v-model="item.BusinessType"></v-text-field>
        <v-text-field label="Product Name" v-model="item.ProductName"></v-text-field>
        <v-text-field label="Search Criteria" v-model="item.SearchCriteria"></v-text-field>
        <v-text-field label="Salutation" v-model="item.Salutation"></v-text-field>
        <v-text-field label="First Name" v-model="item.FirstName"></v-text-field>
        <v-text-field label="Last Name" v-model="item.LastName"></v-text-field>
      </v-form>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      item: {},
    };
  },
  created() {
    // 데이터는 router의 state에서 받아옵니다.
    if (this.$route.params.item) {
      this.item = JSON.parse(this.$route.params.item);
    } else {
      this.$router.push('/');
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1); // 이전 페이지로 이동
    },
  },
};
</script>
