<template>
  <a-card :bordered="false">
    <a-row>
      <h3 class="glance">总览</h3>
    </a-row>
    <a-row :gutter="24" class="detail">
      <a-col :md="4">
        平均天数：
      </a-col>
      <a-col :md="20">
        {{ mean }}
      </a-col>
    </a-row>
    <a-row :gutter="24" class="detail">
      <a-col :md="4">
        浮动天数：
      </a-col>
      <a-col :md="20">
        {{ varDays }}
      </a-col>
    </a-row>
    <a-row :gutter="24" class="detail">
      <a-col :md="4">
        最近一次日期：
      </a-col>
      <a-col :md="20">
        {{ lastDay }}
      </a-col>
    </a-row>
    <a-row :gutter="24" class="detail">
      <a-col :md="4">
        最近两次间隔：
      </a-col>
      <a-col :md="20">
        {{ days }}
      </a-col>
    </a-row>
    <a-row :gutter="24" class="detail">
      <a-col :md="4">
        预计下次日期：
      </a-col>
      <a-col :md="20">
        {{ next }}
      </a-col>
    </a-row>

    <a-row>
      <h3>明细</h3>
    </a-row>
    <a-table
      :columns="columns"
      :rowKey="record => record.id"
      :dataSource="dataSource"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
    >
    </a-table>
  </a-card>
  <!--    todo df 趋势数据，同比数据-->
  <!--    <Row>-->
  <!--      <h3>趋势</h3>-->
  <!--      最近12个月/所有时间-->
  <!--      平均天数趋势-->
  <!--      浮动天数趋势-->
  <!--    </Row>-->
</template>

<script>

import { getMenstrualList, getGlance } from '@/api/queen'
import { STable, Ellipsis } from '@/components'

export default {
  components: {
    STable,
    Ellipsis
  },
  data () {
    return {
      mean: '',
      varDays: '',
      lastDay: '',
      days: '',
      next: '',
      columns: [
        {
          title: '#',
          dataIndex: 'id'
        },
        {
          title: '日期',
          dataIndex: 'dt'
        },
        {
          title: '更新时间',
          dataIndex: 'updateAt'
        },
        {
          title: '更新用户',
          dataIndex: 'updateBy'
        }
      ],
      dataSource: [],
      pagination: {
        showQuickJumper: true,
        size: 'small'
      },
      loading: false
    }
  },
  methods: {
    handleTableChange (pagination, filters, sorter) {
      const pager = { ...this.pagination }
      pager.current = pagination.current
      this.pagination = pager
      this.fetch({
        size: pagination.pageSize,
        number: pagination.current,
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...filters
      })
    },
    fetch (params = { number: 1, size: 10 }) {
      this.loading = true
      getMenstrualList(params).then(res => {
        const pagination = { ...this.pagination }
        pagination.total = res.totalElements
        this.pagination = pagination
        this.dataSource = res.content
        this.loading = false
      })
    },
    getGlance () {
      getGlance().then(res => {
        this.mean = res.mean
        this.varDays = res.varDays
        this.lastDay = res.lastDay
        this.days = res.days
        this.next = res.next
      })
    }
  },
  mounted () {
    this.getGlance()
    this.fetch()
  }
}
</script>

<style scoped>
  .detail {
    margin-bottom: 10px;
  }
  h3 {
    margin-top: 30px;
    margin-bottom: 10px;
  }
  .glance {
    margin-top: 0;
  }
</style>
