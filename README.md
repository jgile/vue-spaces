# Vue Space
Space - a Vue component and/or directive used to add variables and functions to the DOM without having to create a component.
The spaces are fully reactive, so they can be used in computed attributes and templates.

This was largely inspired by alpine.js.

## Project setup
```
npm install --save vue-spaces
```

## Usage
Install the plugin:
```js
import Vue from 'vue';
import Space from 'vue-spaces';

Vue.use(Space);
```

The installation provides you with a component and directive that can be used interchangeably.

Using the directive, define a space and its data and methods.  The space ID is required to identify the space.
```vue
<div
    v-space:messageSpace="{
        message: 'hello world',
        updateMessage(newMessage) {
            this.message = newMessage;
        },
    }"
>
    {{ $space('messageSpace').message }}
    
    <button @click="$space('messageSpace').updateMessage('Foo Bar')">Update message</button>
</div>
```

The same functionality with the component.  When using the component, you can use v-slot to get the space without the $space helper.
```vue
<space 
    id="messageSpace"
    :data="{
        message: 'hello world',
        updateMessage(newMessage) {
            this.message = newMessage;
        },
    }"
    v-slot="space"
>
    {{ space.message }}
    <button @click="space.updateMessage('Foo Bar')">Update message</button>
</space>
```

Both component and directive have "init" methods that trigger when the component or directive is mounted.  For example:

Component
```javascript
<space 
    :data="{
        updateMessage(){...}
    }" 
    // call a function defined in your space
    init="updateMessage('Foo Bar')"
    // or
    init="this.updateMessage('Foo Bar')"
    // or initiate any other code
    init="this.popper = new Popper()"
>
    ...
</space>
```

Directive - when using a directive, you must pass a string or the expression will be evaluated immediately.
```javascript
<div
    v-space:mySpace="{
        updateMessage(){...}
    }" 
    // call a function defined in your space
    v-space:mySpace.init="'updateMessage(\'Foo Bar\')'"
    // or
    v-space:mySpace.init="'this.updateMessage(\'Foo Bar\')'"
    // or initiate any other code
    v-space:mySpace.init="'this.popper = new Popper()'"
>
    ...
</space>
```

The "$space" helper function can be used to access your spaces anywhere in your app.
```javascript
export default {
    computed: {
        someProperty(){
            return this.$space('spaceId').someProperty;
        }   
    },
    template: `
    <div>
        {{ someProperty }}
        is the same as
        {{ $space('spaceId').someProperty }}
    </div>
   `
};
```

Spaces have some built in helpers to make them easier to work with.
```javascript
// Get - get with dot notation
$space('spaceId').$get('foo.bar')

// Set - set with dot notation
$space('spaceId').$set('foo.bar', 'baz')

// Has - has with dot notation.
$space('spaceId').$has('foo.bar')

// Toggle (boolean) - toggle a boolean.
$space('spaceId').$toggle('show')

// Toggle (array) - toggle an item in an array.
// Space: { selection: ['foo', 'bar', 'baz'] }
$space('spaceId').$toggle('selection', 'foo') // { selection: ['bar', 'baz'] }
$space('spaceId').$toggle('selection', 'foo') // and back: { selection: ['foo', 'bar', 'baz'] }

// Includes (array) - check if item in array.
// Space: { selection: ['foo', 'bar'] }
$space('spaceId').$includes('selection', 'foo') // true
$space('spaceId').$includes('selection', 'baz') // false

// Includes (string) - check if string has substring
// Space: { someString: 'abcde' }
$space('spaceId').$includes('someString', 'abc') // true
$space('spaceId').$includes('selection', 'ace') // false

// Call - call function defined in your space.
// someFunction(prop, propTwo)
$space('spaceId').$call('someFunction', propertyOne, propertyTwo)
```

### Run unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information what has changed recently.

### Security

If you discover any security related issues, please contact John Gile.

## Credits

- [John Gile](https://github.com/jgile)
- [All Contributors](../../contributors)

