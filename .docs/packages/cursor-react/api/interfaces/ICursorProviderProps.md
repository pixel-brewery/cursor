# Interface: ICursorProviderProps

Configuration and content for a React Cursor scope.

## Properties

### children?

> `readonly` `optional` **children?**: `ReactNode`

Content that can access the configured registry.

***

### features?

> `readonly` `optional` **features?**: readonly `ICursorFeature`[]

Features that supply the accessor classes used by this scope.

#### Remarks

Keep the array reference stable to reuse the registry across renders.
