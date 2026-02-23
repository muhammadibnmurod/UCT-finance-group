<template>
  <template v-if="data">
    <el-table :data="data" class="!h-full">
      <el-table-column label="№" :width="indexWidth || 50">
        <template #default="scope">
          {{ (page - 1) * size + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column v-for="column in columns" :key="column.prop" :prop="column.prop" :label="column.label"
        :width="column.width">
        <template #default="scope">
          <slot :name="column.prop" v-bind="scope">
            {{ scope.row[column.prop] }}
          </slot>
        </template>
      </el-table-column>

      <el-table-column v-if="actions && showAnyAction" :label="$t('action.plural')" :width="actions.width || 100"
        fixed="right">
        <template #default="{ row }">
          <div class="flex items-center gap-2">
            <button v-if="actions.view" @click="$emit('view', row)"
              class="!w-10 !h-10 flex items-center justify-center rounded-full border border-surface-30">
              <el-icon class="w-8 h-8 text-primary-color">
                <View />
              </el-icon>
            </button>

            <button v-if="actions.edit" @click="$emit('edit', row)"
              class="!w-10 !h-10 flex items-center justify-center rounded-full border border-surface-30">
              <IconEdit class="w-4 h-4 text-primary-color" />
            </button>

            <button v-if="actions.delete" @click="$emit('delete', row)"
              class="!w-10 !h-10 flex items-center justify-center rounded-full border border-surface-30">
              <IconTrash class="w-4 h-4 text-primary-color" />
            </button>

            <button v-if="actions.download" @click="$emit('download', row)"
              class="!w-10 !h-10 flex items-center justify-center rounded-full border border-surface-30">
              <IconDownload class="w-4 h-4 text-primary-color" />
            </button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </template>
  <template v-else>
    <el-empty :description="$t('table.empty')" />
  </template>
</template>

<script setup lang="ts">
import { IconDownload } from "#components";
import { View } from "@element-plus/icons-vue";

interface Column {
  prop: string;
  label: string;
  width?: number;
}

interface Actions {
  view?: boolean;
  edit?: boolean;
  delete?: boolean;
  download?: boolean;
  width?: number;
}

type Props = {
  data: Array<Record<string, any>> | undefined;
  columns: Array<Column>;
  actions?: Actions;
  page?: number;
  size?: number;
  indexWidth?: number;
};

const props = withDefaults(defineProps<Props>(), {
  page: 1,
  size: 10,
  actions: undefined,
  indexWidth: 50
});

defineEmits(["view", "edit", "delete", "download"]);

const showAnyAction = computed(
  () => props.actions && Object.values(props.actions).some(x => x === true)
);
</script>

<style lang="css">
:root {
  .el-table {
    --el-table-bg-color: none;
    --el-table-tr-bg-color: none;
    --el-table-row-hover-bg-color: none;
    --el-table-header-text-color: var(--primary-color);
    --el-table-text-color: var(--primary-color);
    --el-table-header-bg-color: var(--surface-30);
    --el-table-border-color: var(--surface-20);
  }
}
</style>

<style lang="css">
.el-table thead .el-table__cell {
  @apply border-t border-surface-20;
}

.el-table thead .el-table__cell:first-child {
  @apply rounded-l-lg border-l;
}

.el-table thead .el-table__cell:last-child {
  @apply rounded-r-lg border-r border-solid border-surface-20;
}

.el-table tbody .el-table__cell {
  @apply py-4 border-surface-30;
}

.el-table--enable-row-transition .el-table__body td.el-table__cell {
  @apply !bg-surface-40
}

.hover-row {
  @apply !bg-surface-40
}
</style>
