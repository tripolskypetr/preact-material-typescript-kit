
## Button Props

Prop Name | Type | Description
--- | --- | ---
className | String | Classes to be applied to the root element.
raised | Boolean | Enables raised variant.
unelevated | Boolean | Enables unelevated variant.
outlined | Boolean | Enables outlined variant.
dense | Boolean | Enables dense variant.
icon | String | Icon to render within root element.
trailingIcon | String | Icon to render on the right side of the element
label | String | Text to be displayed within root element.
disabled | Boolean | Disables button if true.

## Checkbox Props

Prop Name | Type | Description
--- | --- | ---
className | String | Classes to be applied to the checkbox element
checked | Boolean | Indicates whether the checkbox is checked ("on")
indeterminate | Boolean | Indicates whether the checkbox is indeterminate
disabled | Boolean | Indicates whether the checkbox is disabled
label | String | Checkbox text description

## Icon Props

Prop Name | Type | Description
--- | --- | ---
icon | string | Type of icon to be displayed.
className | string | Classes to pass on to the root `<i>` element.

## Radio Props

Prop Name | Type | Description
--- | --- | ---
className | String | Classes to be applied to the `.mdc-radio` element.
checked | Boolean | Default `false`. When true will switch radio to the checked state.
name | String | The associated name with the radio element.
value | String | The associated value with the radio element.
disabled | Boolean | Default `false`. When true will disable the radio element.
label | String | Label associated with radio input control.

## Switch Props

Prop Name | Type | Description
--- | --- | ---
className | String | Classes to be applied to the switch element
checked | Boolean | Indicates whether the switch is checked ("on")
disabled | Boolean | Indicates whether the switch is disabled
label | String | Label associated with switch control.

## TextField Props

Prop Name | Type | Description
--- | --- | ---
value | string | Proxies to the foundation’s getValue/setValue methods.
disabled | boolean | Proxies to the foundation’s isDisabled/setDisabled methods.
valid | boolean | Proxies to the foundation’s isValid/setValid methods.
className | String | Classes to be applied to the TextField element
leadingIcon | String | TextField leading icon
trailingIcon | String | TextField trailing icon
fullWidth | boolean | Styles the text field as a full width textarea field.
outlined | boolean | Styles the text field as an outlined text field.,
textArea | boolean | Indicates the text field is a textarea tag.
focused | boolean | Styles the text field as a text field in focus.
label | string | Styles the text field label.
helperText | string | TextField helper text

## IconButton Props

Prop Name | Type | Description
--- | --- | ---
on | boolean | IconButton state
iconOn | string | IconButton 'on' icon
iconOff | string | IconButton 'off' icon
disabled | boolean | IconButton disable switch
color | string | IconButton color

## Chip Props

Prop Name | Type | Description
--- | --- | ---
icon | string | Chip icon
className | string | Chip classname

## Floating Action Button Props

Prop Name | Type | Description
--- | --- | ---
className | String | Classes to be applied to the root element.
exited | Boolean | When true animates the FAB out of view. When this false, the FAB will return to view.
mini | Boolean |  Enables the mini variant. 
icon | Element | The icon.
textLabel | String | The label, which makes the FAB extended.

## Select Props
Prop Name | Type | Description
--- | --- | ---
value | string | The value/data-value of the currently selected option.
selectedIndex | number | The index of the currently selected option. Set to -1 if no option is currently selected. Changing this property will update the select element. disabled	boolean	Whether or not the component is disabled. Setting this sets the disabled state on the component.
valid | boolean | Whether or not the component is in a valid state. Setting this updates styles on the component, but does not affect the native validity state.
required | boolean | Whether or not the component is required. Setting this updates the required or aria-required attribute on the component and enables validation.
disabled = false,
outlined = false,
className = '',
label = 'hello world',
items = [],

