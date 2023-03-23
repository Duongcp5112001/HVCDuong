<template>
  <div class="input">
    <label>
      <input
        ref="refHiddenInput"
        :type="inputType"
        :accept="acceptedFile"
        @change="onChangeFile"
      />
    </label>
    <div class="input-content">
      <span v-if="!fileName" class="input-content__upload" @click="onClick">
        <slot />
      </span>
      <template v-if="fileName">
        <div class="input-content__file">
          <Icon icon="attachment" color="#000" :size="17" />
          <Text class="input-content__file--text" size="base" color="primary">
            {{ fileName }}
          </Text>
          <Button
            icon="delete"
            type="text"
            color="critical"
            @click="onRemoveFile"
          />
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import Icon from '../Icon/Icon.vue';
import Text from '../../components/Text/Text.vue';
import Button from '../Button/Button.vue';

type Props = {
  fileData?: string[];
  fileName?: string;
  type?: 'csv';
  fileSize?: number;
};

const props = withDefaults(defineProps<Props>(), {
  fileData: () => [],
  fileName: '',
  type: 'csv',
  fileSize: 5000000,
});

const emit =
  defineEmits<{
    (event: 'upload', value: [string[], string, string]): void;
  }>();

const refHiddenInput = ref<HTMLInputElement | null>(null);

const onClick = () => {
  if (!refHiddenInput.value) return;
  refHiddenInput.value.value = '';
  refHiddenInput.value.click();
  console.log('onClickButton');
};

const onChangeFile = (event: Event) => {
  if (!(event.target instanceof HTMLInputElement)) return;
  if (!event.target.files) return;
  const file = event.target.files[0];
  if (!checkFile(file)) return;

  const reader = new FileReader();
  reader.readAsText(file);
  reader.onload = () => {
    if (typeof reader.result === 'string') {
      emit('upload', [
        reader.result.split('\r\n'),
        file.name,
        'データを読み込みました',
      ]);
    }
  };
  reader.onerror = (error) => {
    emit('upload', [[], '', `${error} ファイル読み取りに失敗しました`]);
  };
};

const checkFile = (file: File) => {
  let result = true;
  if (!file) {
    result = false;
  }
  if (file.type !== acceptedFile.value) {
    result = false;
  }
  if (file.size > props.fileSize) {
    result = false;
  }
  return result;
};

const onRemoveFile = () => {
  emit('upload', [[], '', 'データを削除しました']);
  console.log('onRemoveFile');
};

const inputType = computed(() => {
  switch (props.type) {
    case 'csv':
      return 'file';
    default:
      return 'file';
  }
});

const acceptedFile = computed(() => {
  switch (props.type) {
    case 'csv':
      return 'text/csv';
    default:
      return 'text/text';
  }
});
</script>

<style scoped lang="scss">
@import '../../scss/mixins';
@import '../../scss/variables';

label > input {
  display: none;
}
label:hover {
  cursor: pointer;
}

.input {
  display: flex;
}

.input-content {
  width: 100%;
}

.input-content__upload {
  cursor: pointer;
}
.input-content__file {
  display: flex;
  align-items: center;
  gap: 10px;
}

.input-content__file--text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
  width: 165px;
}
</style>
