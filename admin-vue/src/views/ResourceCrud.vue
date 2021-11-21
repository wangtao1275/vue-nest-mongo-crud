<template>
  <div>
    <avue-crud
      v-if="option.column"
      :page="page"
      :data="data.data"
      :option="option"
      @row-save="create"
      @row-update="update"
      @row-del="remove"
      @on-load="changePage"
      @sort-change="changeSort"
      @search-change="search"
      @search-reset="resetSearch"
      @refresh-change="refreshChange"
    ></avue-crud>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({})
export default class ResourceList extends Vue {
  @Prop(String) resource!: string;
  data: any = {};
  option: any = {};
  page: any = {
    pageSize: 3,
    pageSizes: [3, 5, 10],
    total: 0
  };
  query: any = {
    // sort: { _id: -1 }
  };

  async fetchOption() {
    const res = await this.$http.get(`${this.resource}/option`);
    this.option = res.data;
  }

  async changePage({ pageSize, currentPage }) {
    this.query.page = currentPage;
    this.query.limit = pageSize;
    this.fetch();
  }

  async changeSort({ prop, order }) {
    if (!order) {
      this.query.sort = null;
    } else {
      this.query.sort = {
        [prop]: order === "ascending" ? 1 : -1
      };
    }
    this.fetch();
  }

  async search(where, done) {
    for (let k in where) {
      const field = this.option.column.find(v => v.prop === k);
      if (field.regex) {
        where[k] = { $regex: where[k] };
      }
    }
    this.query.page = 1
    this.query.where = where;
    this.fetch();
    if (done) done();
  }

  async resetSearch(where, done) {
    this.query.where = {};
    this.query.page = 1
    this.query.limit = 3
    this.fetch();
    if (done) done();
  }

  refreshChange () {
    this.fetch();
  }

  async fetch() {
    const res = await this.$http.get(`${this.resource}`, {
      params: {
        query: this.query
      }
    });
    this.page.total = res.data.total;
    this.data = res.data;
  }

  async create(row, done) {
    await this.$http.post(`${this.resource}`, row);
    this.$message.success("Create Successfully");
    this.fetch();
    done();
  }

  async update(row, index, done) {
    const data = JSON.parse(JSON.stringify(row));
    delete data.$index;
    await this.$http.put(`${this.resource}/${row._id}`, data);
    this.$message.success("Update Successfully");
    this.fetch();
    done();
  }

  async remove(row) {
    try {
      await this.$confirm("Are you sure to delete?");
    } catch (e) {
      return;
    }
    await this.$http.delete(`${this.resource}/${row._id}`);
    this.$message.success("Delete Successfully");
    this.fetch();
  }

  created() {
    this.fetchOption();
    this.fetch();
  }
}
</script>

<style>
</style>