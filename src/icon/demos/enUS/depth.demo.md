# Depth

To match different level text colors, icon provides `depth` prop.

```html
<n-icon size="40" :depth="1">
  <cash-outline />
</n-icon>
<n-icon size="40" :depth="2">
  <cash-outline />
</n-icon>
<n-icon size="40" :depth="3">
  <cash-outline />
</n-icon>
<n-icon size="40" :depth="4">
  <cash-outline />
</n-icon>
<n-icon size="40" :depth="5">
  <cash-outline />
</n-icon>
```

```js
import { CashOutline } from '@vicons/ionicons5'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    CashOutline
  }
})
```
