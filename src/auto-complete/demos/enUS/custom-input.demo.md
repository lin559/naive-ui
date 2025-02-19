# Custom Input Element

You can replace auto-complete's input element.

```html
<n-auto-complete
  :options="options"
  v-model:value="value"
  #="{ handleInput, handleBlur, handleFocus, value }"
>
  <n-input
    type="textarea"
    @input="handleInput"
    @focus="handleFocus"
    @blur="handleBlur"
    :value="value"
    placeholder="Email"
  />
</n-auto-complete>
```

```js
import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  setup () {
    const valueRef = ref('')
    return {
      value: valueRef,
      options: computed(() => {
        return ['@gmail.com', '@163.com', '@qq.com'].map((suffix) => {
          const prefix = valueRef.value.split('@')[0]
          return {
            label: prefix + suffix,
            value: prefix + suffix
          }
        })
      })
    }
  }
})
```
