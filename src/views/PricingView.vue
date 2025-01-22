<template>
  <v-container class="pa-13 mb-13">
    <div v-if="!currentUser">
      <header class="jumbotron">
        <h3>{{ content }}</h3>
      </header>
    </div>
    <div v-else>
      <!-- 검색 필터 -->
      <v-row class="align-center">
        <v-col cols="3">
          <v-autocomplete 
            v-model="selectedSuppliers" 
            :items="filterSuppliers"
            item-text="Supplier"
            item-value="Supplier"
            multiple
            chip
            flat
            hide-no-data
            hide-details
            placeholder="Select suppliers..."
            persistent-hint
            :search-input.sync="search"
          >
            <!-- 검색 결과 수 표시 -->
          <template v-slot:prepend-item>
            <v-list-item>
              <v-list-item-title>{{ filterSuppliers.length }} items found</v-list-item-title>
            </v-list-item>
          </template>

          <!-- 선택된 항목 -->
          <template v-slot:selection="{ item, index }">
            <v-chip
              v-if="item"
              close
              @click:close="removeSupplier(index)"
            >
              {{ item.Supplier }}
            </v-chip>
          </template>
        </v-autocomplete>
        </v-col>
        <!-- -->
        <!-- Region -->
        <v-col cols="3">
          <v-autocomplete 
            v-model="selectedRegion"
            :items="regions"
            item-text="Region"
            item-value="Region"
            multiple
            chip
            flat
            hide-no-data
            hide-details
            placeholder="Select Region..."
            persistent-hint
            :search-input.sync="searchRegion"
          >
            <template v-slot:prepend-item>
              <v-list-item>
                <v-list-item-title>{{ regions.length }} items found</v-list-item-title>
              </v-list-item>
            </template>

            <template v-slot:selection="{ item, index }">
              <v-chip v-if="item" close @click:close="removeRegion(index)">
                {{ item.Region }}
              </v-chip>
            </template>
          </v-autocomplete>
        </v-col>
        <!--2222222-->
        
        <!-- Product Name -->
        <v-col cols="3">
          <v-autocomplete 
            v-model="selectedProductName"
            :items="productNames"
            item-text="ProductName"
            item-value="ProductName"
            multiple
            chip
            flat
            hide-no-data
            hide-details
            placeholder="Select Product Name..."
            persistent-hint
            :search-input.sync="searchProductName"
          >
            <template v-slot:prepend-item>
              <v-list-item>
                <v-list-item-title>{{ productNames.length }} items found</v-list-item-title>
              </v-list-item>
            </template>

            <template v-slot:selection="{ item, index }">
              <v-chip v-if="item" close @click:close="removeProductName(index)">
                {{ item.ProductName }}
              </v-chip>
            </template>
          </v-autocomplete>
        </v-col>

        <!-- Department -->
        <v-col cols="3">
          <v-autocomplete 
            v-model="selectedDepartment"
            :items="departments"
            item-text="Department"
            item-value="Department"
            multiple
            chip
            flat
            hide-no-data
            hide-details
            placeholder="Select Department..."
            persistent-hint
            :search-input.sync="searchDepartment"
          >
            <template v-slot:prepend-item>
              <v-list-item>
                <v-list-item-title>{{ departments.length }} items found</v-list-item-title>
              </v-list-item>
            </template>

            <template v-slot:selection="{ item, index }">
              <v-chip v-if="item" close @click:close="removeDepartment(index)">
                {{ item.Department }}
              </v-chip>
            </template>
          </v-autocomplete>
        </v-col>

        <!-- Company Name -->
        <v-col cols="3">
          <v-autocomplete 
            v-model="selectedCompanyName"
            :items="companyNames"
            item-text="CompanyName"
            item-value="CompanyName"
            multiple
            chip
            flat
            hide-no-data
            hide-details
            placeholder="Select Company Name..."
            persistent-hint
            :search-input.sync="searchCompanyName"
          >
            <template v-slot:prepend-item>
              <v-list-item>
                <v-list-item-title>{{ companyNames.length }} items found</v-list-item-title>
              </v-list-item>
            </template>

            <template v-slot:selection="{ item, index }">
              <v-chip v-if="item" close @click:close="removeCompanyName(index)">
                {{ item.CompanyName }}
              </v-chip>
            </template>
          </v-autocomplete>
        </v-col>

        <!-- Business Type -->
        <v-col cols="3">
          <v-autocomplete 
            v-model="selectedBusinessType"
            :items="businessTypes"
            item-text="BusinessType"
            item-value="BusinessType"
            multiple
            chip
            flat
            hide-no-data
            hide-details
            placeholder="Select Business Type..."
            persistent-hint
            :search-input.sync="searchBusinessType"
          >
            <template v-slot:prepend-item>
              <v-list-item>
                <v-list-item-title>{{ businessTypes.length }} items found</v-list-item-title>
              </v-list-item>
            </template>

            <template v-slot:selection="{ item, index }">
              <v-chip v-if="item" close @click:close="removeBusinessType(index)">
                {{ item.BusinessType }}
              </v-chip>
            </template>
          </v-autocomplete>
        </v-col>

        <!-- Country/Region -->
        <v-col cols="3">
          <v-autocomplete 
            v-model="selectedCountryRegion"
            :items="countryRegions"
            item-text="CountryRegion"
            item-value="CountryRegion"
            multiple
            chip
            flat
            hide-no-data
            hide-details
            placeholder="Select Country/Region..."
            persistent-hint
            :search-input.sync="searchCountryRegion"
          >
            <template v-slot:prepend-item>
              <v-list-item>
                <v-list-item-title>{{ countryRegions.length }} items found</v-list-item-title>
              </v-list-item>
            </template>

            <template v-slot:selection="{ item, index }">
              <v-chip v-if="item" close @click:close="removeCountryRegion(index)">
                {{ item.CountryRegion }}
              </v-chip>
            </template>
          </v-autocomplete>
        </v-col>

        <!-- Search Criteria -->
        <v-col cols="3">
          <v-autocomplete 
            v-model="selectedSearchCriteria"
            :items="searchCriteriaOptions"
            item-text="SearchCriteriaOption"
            item-value="SearchCriteriaOption"
            multiple
            chip
            flat
            hide-no-data
            hide-details
            placeholder="Select Search Criteria..."
            persistent-hint
            :search-input.sync="searchSearchCriteria"
          >
            <template v-slot:prepend-item>
              <v-list-item>
                <v-list-item-title>{{ searchCriteriaOptions.length }} items found</v-list-item-title>
              </v-list-item>
            </template>

            <template v-slot:selection="{ item, index }">
              <v-chip v-if="item" close @click:close="removeSearchCriteria(index)">
                {{ item }}
              </v-chip>
            </template>
          </v-autocomplete>
        </v-col>
        <!-- 검색 -->
        <v-col>
          <v-btn color="primary" @click="getData">
            검색
          </v-btn>
        </v-col>
      </v-row>

      <!-- 데이터 테이블 -->
      <v-data-table
        :headers="headers"
        :items="items"
        :loading="loading"
        :page.sync="page"
        :items-per-page="itemsPerPage"
        :server-items-length="totalItems"
        item-key="idx"
        show-select
        class="elevation-1"
        @click:row="navigateToDetail"
        @update:page="pageChanged"
        @update:items-per-page="itemsPerPageChanged"
      >
      </v-data-table>

      <!-- 알림 스낵바 -->
      <v-snackbar v-model="snackbar" :timeout="timeout">
        {{ text }}
        <template v-slot:action="{ attrs }">
          <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </div>
  </v-container>
</template>

<script>
import axios from "axios";
import authHeader from "../services/auth-header";

export default {
  data() {
    return {
      selectedSuppliers: [],
      selectedRegion: [],
      selectedProductName: [],
      selectedDepartment: [],
      selectedCompanyName: [],
      selectedBusinessType: [],
      selectedCountryRegion: [],
      selectedSearchCriteria: [],
      filterSuppliers: [],
      regions: [],
      productNames: [],
      departments: [],
      companyNames: [],
      businessTypes: [],
      countryRegions: [],
      searchCriteriaOptions: [],
      filter1: [],
      loading: false,
      snackbar: false,
      text: "",
      timeout: 2000,
      page: 1,
      itemsPerPage: 10,
      totalItems: 0,
      items: [],
      filters: {
        supplier: "",
        region: "",
        productName: "",
      },
      completeData: [],
      regionSuggestions: [],
      productSuggestions: [],
      headers: [
        { text: "ID", value: "idx" },
        { text: "Supplier", value: "Supplier" },
        { text: "Region", value: "Region" },
        { text: "Product Name", value: "ProductName" },
        { text: "Status", value: "status", sortable: false },
      ],
      inputMsg: null, // 선택된 항목 (v-model과 바인딩)
      search: "", // 검색어 (search-input.sync와 바인딩)
      searchRegion: "",
      searchProductName: "",
      searchDepartment: "",
      searchSearchCriteria: "",
      searchCountryRegion: "",
      searchBusinessType: "",
      searchCompanyName: "",
    };
  },
  created() {
    this.getData();
  },
  methods: {
    removeSupplier(index) {
      // Chip 닫기 버튼 클릭 시 선택 해제
      this.selectedSuppliers.splice(index, 1);
    },
    removeRegion(index) {
      this.selectedRegion.splice(index, 1);
    },
    removeProductName(index) {
      this.selectedProductName.splice(index, 1);
    },
    removeDepartment(index) {
      this.selectedDepartment.splice(index, 1);
    },
    removeCompanyName(index) {
      this.selectedCompanyName.splice(index, 1);
    },
    removeBusinessType(index) {
      this.selectedBusinessType.splice(index, 1);
    },
    removeCountryRegion(index) {
      this.selectedCountryRegion.splice(index, 1);
    },
    removeSearchCriteria(index) {
      this.selectedSearchCriteria.splice(index, 1);
    },
    onItemClick(item) {
      console.log("Clicked item:", item);
      this.inputMsg = item.Supplier; // 선택된 값을 inputMsg에 저장
    },
    fetchData(endpoint, targetArray, query = "") {
      console.log("filters=>", this.selectedSuppliers, this.selectedRegion,
                  this.selectedProductName,
                  this.selectedDepartment,
                  this.selectedCompanyName,
                  this.selectedBusinessType,
                  this.selectedCountryRegion,
                  this.selectedSearchCriteria,
                  )
      this.loading = true;
      axios
        .get(endpoint, {
          headers: authHeader(),
          params: { query }
        })
        .then((response) => {
          console.log(`${endpoint} Response:`, response.data);
          console.log("rtn=>", targetArray)
          this[targetArray] = response.data; // 대상 배열에 데이터 업데이트
        })
        .catch((error) => {
          console.log(`Error fetching ${endpoint}:`, error.response);
          this[targetArray] = []; // 에러 발생 시 항목 초기화
        })
        .finally(() => {
          this.loading = false;
        });
    },
    // 각 데이터 호출
    fetchSuppliers(query) {
      this.fetchData("/parts/supplier/", "filterSuppliers", query);
    },
    fetchRegions(query) {
      this.fetchData("/parts/region/", "regions", query);
    },
    fetchProductNames(query) {
      this.fetchData("/parts/product-name/", "productNames", query);
    },
    fetchDepartments(query) {
      this.fetchData("/parts/department/", "departments", query);
    },
    fetchCompanyNames(query) {
      this.fetchData("/parts/company-name/", "companyNames", query);
    },
    fetchBusinessTypes(query) {
      this.fetchData("/parts/business-type/", "businessTypes", query);
    },
    fetchCountryRegions(query) {
      this.fetchData("/parts/country-region/", "countryRegions", query);
    },
    fetchSearchCriteria(query) {
      this.fetchData("/parts/search-criteria/", "searchCriteriaOptions", query);
    },
    //자동검색 리스트에서 바깥부분 클릭시 리스트 닫음
    onClickOutside () {
      this.autoSearchList = false
    },
    pageChanged(newPage) {
      this.page = newPage;
      this.getData(); // Re-fetch data when page changes
    },
    itemsPerPageChanged(newItemsPerPage) {
      this.itemsPerPage = newItemsPerPage;
      this.getData(); // Re-fetch data when items per page changes
    },
    navigateToDetail(item) {
      this.$router.push({
        name: 'DetailPage',
        params: { item: JSON.stringify(item) },
      });
    },
    getData() {
      this.loading = true;
      console.log(this.selectedRegion)
      axios
        .get("/parts/search", {
          headers: authHeader(),
          params: {
            page: this.page,
            pageSize: this.itemsPerPage,
            supplier: this.selectedSuppliers,
            region: this.selectedRegion,
            productName: this.selectedProductName,
            department: this.selectedDepartment,
            companyName: this.selectedCompanyName,
            businessType: this.selectedBusinessType,
            countryRegion: this.selectedCountryRegion,
            searchCriteria: this.selectedSearchCriteria
          },
          paramsSerializer: params => {
            const searchParams = new URLSearchParams();
            for (const key in params) {
              if (Array.isArray(params[key])) {
                params[key].forEach(value => {
                  searchParams.append(key, value);
                });
              } else {
                searchParams.append(key, params[key]);
              }
            }
            return searchParams.toString();
          }
        })
        .then((response) => {
          console.log("결과=>", response.data.data)
          console.log("결과 total=>", response.data.total)
          this.items = response.data.data;
          this.totalItems = response.data.total;
        })
        .catch((error) => {
          this.createSnackBar("서버에러: " + error.message);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    createSnackBar(message) {
      this.snackbar = true;
      this.text = message;
    },
  },
  
  computed: {
    currentUser() {
      return !!this.$store.state.auth.user;
    },
  },
  watch: {
    search(query) {
      if (query) {
        this.fetchSuppliers(query);
      } else {
        this.filter1 = []; // 검색어가 없으면 항목 초기화
      }
    },
    searchRegion(query) {
      console.log("searchRegion")
      if (query) {
        this.fetchRegions(query);
      } else {
        this.filter1 = []; // 검색어가 없으면 항목 초기화
      }
    },
    searchProductName(query) {
      if (query) {
        this.fetchProductNames(query);
      } else {
        this.filter1 = []; // 검색어가 없으면 항목 초기화
      }
    },
    searchDepartment(query) {
      if (query) {
        this.fetchDepartments(query);
      } else {
        this.filter1 = []; // 검색어가 없으면 항목 초기화
      }
    },
    searchSearchCriteria(query) {
      if (query) {
        this.fetchSearchCriteria(query);
      } else {
        this.filter1 = []; // 검색어가 없으면 항목 초기화
      }
    },
    searchCountryRegion(query) {
      if (query) {
        this.fetchCountryRegions(query);
      } else {
        this.filter1 = []; // 검색어가 없으면 항목 초기화
      }
    },
    searchBusinessType(query) {
      if (query) {
        this.fetchBusinessTypes(query);
      } else {
        this.filter1 = []; // 검색어가 없으면 항목 초기화
      }
    },
    searchCompanyName(query) {
      if (query) {
        this.fetchCompanyNames(query);
      } else {
        this.filter1 = []; // 검색어가 없으면 항목 초기화
      }
    },
  }
};
</script>
