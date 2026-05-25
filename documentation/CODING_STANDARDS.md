# Coding Standards & Best Practices

## Table of Contents
1. [Design Principles](#design-principles)
2. [File Structure Rules](#file-structure-rules)
3. [Component Guidelines](#component-guidelines)
4. [State Management](#state-management)
5. [TypeScript Standards](#typescript-standards)
6. [Code Organization](#code-organization)
7. [Styling Guidelines](#styling-guidelines)
8. [Performance Rules](#performance-rules)
9. [API & Services](#api--services)
10. [Forbidden Practices](#forbidden-practices)

---

## Design Principles

### Atomic Design Architecture
All components must follow atomic design methodology:

```
Atoms → Molecules → Organisms → Templates → Pages
```

**Atoms**: Basic building blocks
- Button, Input, Card, Badge, Loader, Select
- Single responsibility
- No business logic
- Highly reusable

**Molecules**: Simple combinations
- FormField (Label + Input)
- StatCard (Icon + Text)
- NavItem (Icon + Label + Action)
- Composed of atoms
- Minimal logic

**Organisms**: Complex UI sections
- TopNav, Header
- Can contain molecules and atoms
- Feature-specific

**Templates**: Page layouts
- MainLayout, PageLayout
- Define page structure
- No business logic

**Pages**: Complete views
- WidgetManagerPage
- Compose all levels
- Connect to state/services

### Minimalistic & Professional
- Clean, uncluttered interfaces
- Consistent spacing and alignment
- Professional color scheme
- No unnecessary decorations
- Clear visual hierarchy

---

## File Structure Rules

### Naming Conventions

**Components**: PascalCase
```
Button.tsx
WidgetForm.tsx
StatCard.tsx
```

**Services**: camelCase with suffix
```
widget.service.ts
page.service.ts
api.ts
```

**Stores**: camelCase with suffix
```
widget.store.ts
ui.store.ts
```

**Hooks**: camelCase with 'use' prefix
```
useWidgetManager.ts
useDashboard.ts
```

**Types**: camelCase with .d suffix
```
api.d.ts
global.d.ts
```

### File Size Limit
**CRITICAL**: No file shall exceed **250 lines of code**

Reasons:
- Improves readability
- Enforces single responsibility
- Easier maintenance
- Better testability

If a file exceeds 250 lines:
1. Split into logical sub-components
2. Extract utilities/helpers
3. Move state logic to custom hooks
4. Create separate files per section

### Folder Organization
Each component/feature must have:
```
ComponentName/
├── ComponentName.tsx    # Main component
├── index.ts             # Export
└── (helpers.ts)         # Optional helpers
```

All exports through index files:
```typescript
// atoms/Button/index.ts
export { Button } from './Button'

// atoms/index.ts
export { Button } from './Button'
export { Card } from './Card'
export { Input } from './Input'
```

---

## Component Guidelines

### Component Structure
```typescript
// 1. Imports
import { useState } from 'react'
import { Button } from '@atoms/Button'
import type { Widget } from '@/types'

// 2. Types/Interfaces
interface WidgetFormProps {
  widget: Widget
  onSave: (data: Widget) => void
}

// 3. Component
export function WidgetForm({ widget, onSave }: WidgetFormProps) {
  // 4. Hooks
  const [isOpen, setIsOpen] = useState(false)

  // 5. Handlers
  const handleSubmit = () => {
    // logic
  }

  // 6. Render
  return (
    <div>
      {/* JSX */}
    </div>
  )
}
```

### Component Naming
- Components start with **uppercase letter**
- Use descriptive, clear names
- Avoid abbreviations
- Follow domain language

```typescript
✅ WidgetForm
✅ WidgetList
✅ StatCard

❌ WF
❌ WidgetComp
❌ MyComponent
```

### Component Splitting
Split components when:
- Exceeds 250 lines
- Has multiple concerns
- Can be reused
- Logic is complex

```typescript
// Before (too large)
function WidgetManager() {
  // 400 lines of JSX and logic
}

// After (properly split)
function WidgetManager() {
  return (
    <>
      <WidgetForm />
      <WidgetList />
      <WidgetPreview />
    </>
  )
}
```

---

## State Management

### useState vs useReducer
**Rule**: If more than **4 useState** calls, use **useReducer**

```typescript
// ❌ Too many useState
function WidgetForm() {
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [postType, setPostType] = useState('page')
  const [titleLike, setTitleLike] = useState('')
  const [columns, setColumns] = useState(3)
  const [showCount, setShowCount] = useState(true)
  // This is getting messy!
}

// ✅ Use reducer
function WidgetForm() {
  const [state, dispatch] = useReducer(reducer, initialState)

  // Much cleaner!
  dispatch({ type: 'SET_NAME', payload: 'Widget Name' })
}
```

### Custom Hooks for Logic
Extract complex logic into custom hooks:

```typescript
// ❌ Logic in component
function WidgetManagerPage() {
  const [widgets, setWidgets] = useState([])
  const [status, setStatus] = useState('idle')

  const fetchWidgets = async () => {
    setStatus('loading')
    try {
      const data = await widgetService.list()
      setWidgets(data)
      setStatus('success')
    } catch (err) {
      setStatus('error')
    }
  }

  // More logic...
}

// ✅ Extract to hook
function useWidgetManager() {
  const [widgets, setWidgets] = useState([])
  const [status, setStatus] = useState('idle')

  const fetchWidgets = async () => {
    // logic
  }

  return { widgets, status, fetchWidgets }
}

function WidgetManagerPage() {
  const manager = useWidgetManager()
  // Clean and focused!
}
```

### Zustand Stores
Use for:
- Global state
- Cross-component state
- Persistent state
- Complex state trees

Store structure:
```typescript
interface StoreState {
  // State
  data: Data[]
  status: RequestStatus
  error: string | null
}

interface StoreActions {
  // Actions
  fetchData: () => Promise<void>
  updateData: (data: Data) => Promise<void>
  reset: () => void
}

export const useStore = create<StoreState & StoreActions>((set) => ({
  // Implementation
}))
```

---

## TypeScript Standards

### No 'any' Type
**FORBIDDEN**: Never use `any` type

```typescript
❌ function doSomething(data: any) { }
❌ const items: any[] = []

✅ function doSomething(data: Widget) { }
✅ const items: Widget[] = []
✅ function generic<T>(data: T) { }
```

### Type Files
All types in `.d.ts` files:

```typescript
// types/api.d.ts
export interface ApiResponse<T> {
  success: boolean
  data: T
}

export interface Widget {
  id: number
  name: string
  slug: string
}
```

### Proper Typing
```typescript
// Component props
interface ButtonProps {
  variant?: 'primary' | 'secondary'
  onClick?: MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
}

// Events
const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
  // Fully typed event
}

// Generics
function apiRequest<T>(action: string): Promise<T> {
  // Type-safe API calls
}
```

---

## Code Organization

### Service Layer
All API calls through services:

```typescript
// services/widget.service.ts
export const widgetService = {
  list: async (): Promise<Widget[]> => {
    return apiRequest<Widget[]>('widget_list')
  },

  create: async (data: CreateWidgetData): Promise<WidgetCreateResponse> => {
    return apiRequest<WidgetCreateResponse>('widget_create', data)
  },
}

// Usage in component
const widgets = await widgetService.list()
```

### Index Exports
Every folder has index.ts:

```typescript
// atoms/index.ts
export { Button } from './Button'
export { Card } from './Card'
export { Input } from './Input'

// Usage
import { Button, Card } from '@atoms/index'
```

### Path Aliases
Use path aliases for clean imports:

```typescript
❌ import { Button } from '../../../components/atoms/Button'
✅ import { Button } from '@atoms/Button'

❌ import { widgetService } from '../../../services/widget.service'
✅ import { widgetService } from '@services/widget.service'
```

Configured aliases:
- `@/` → `src/`
- `@atoms/` → `src/components/atoms/`
- `@molecules/` → `src/components/molecules/`
- `@organisms/` → `src/components/organisms/`
- `@templates/` → `src/components/templates/`
- `@pages/` → `src/pages/`
- `@services/` → `src/services/`
- `@stores/` → `src/stores/`
- `@hooks/` → `src/hooks/`
- `@types/` → `src/types/`
- `@utils/` → `src/utils/`

---

## Styling Guidelines

### UI Library & Tools
- **Mantine v8**: Primary UI component library
- **Tabler Icons**: Icon set
- **Tailwind CSS**: Utility classes with custom variables

### Color System
Use predefined colors only:

```typescript
// tailwind.config.js
colors: {
  primary: '#8C3586',    // Purple
  secondary: '#D9597B',  // Pink
  accent: '#F2935C',     // Orange
  warning: '#F2EB80',    // Yellow
  danger: '#BF0404',     // Red
}
```

### Button Variants (No Borders)
**CRITICAL**: Buttons must not have borders

```typescript
// ✅ Solid backgrounds only
primary: 'bg-primary hover:bg-primary-600 text-white'
secondary: 'bg-secondary hover:bg-secondary-600 text-white'
accent: 'bg-accent hover:bg-accent-600 text-white'
danger: 'bg-danger hover:bg-danger-600 text-white'
subtle: 'bg-gray-100 hover:bg-gray-200 text-gray-700'

// ❌ No outline/border variants
outline: 'border border-gray-300' // FORBIDDEN
```

### Responsive Design
All UIs must be responsive:

```typescript
<SimpleGrid cols={{ base: 1, sm: 2, md: 3 }}>
  {/* Responsive grid */}
</SimpleGrid>
```

### WordPress Admin Integration
Scope all styles under `.pcm-admin-wrap`:

```css
.pcm-admin-wrap {
  /* Scoped styles to avoid WP conflicts */
}

.pcm-admin-wrap * {
  box-sizing: border-box;
}
```

---

## Performance Rules

### Component Performance
```typescript
// ✅ Memoize expensive calculations
const expensiveValue = useMemo(() => {
  return complexCalculation(data)
}, [data])

// ✅ Memoize callbacks
const handleClick = useCallback(() => {
  doSomething()
}, [dependency])

// ✅ Lazy load heavy components
const HeavyComponent = lazy(() => import('./HeavyComponent'))
```

### Code Standards
- Keep components focused (single responsibility)
- Extract reusable logic to hooks
- Use proper TypeScript (enables tree-shaking)
- Minimize bundle size
- No unnecessary re-renders

### API Calls
```typescript
// ✅ Handle loading states
const [status, setStatus] = useState<RequestStatus>('idle')

// ✅ Error handling
try {
  const data = await service.fetch()
} catch (err) {
  setError(err instanceof Error ? err.message : 'Unknown error')
}

// ✅ Avoid duplicate requests
useEffect(() => {
  if (data) return // Already loaded
  fetchData()
}, [])
```

---

## API & Services

### WordPress Integration
Access WordPress config via `window.pcmConfig`:

```typescript
const config = window.pcmConfig || {}

export async function apiRequest<T>(
  action: string,
  data: Record<string, unknown> = {}
): Promise<T> {
  const response = await fetch(config.ajaxUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      action: 'page_city_matrix_' + action,
      nonce: config.nonce,
      ...data,
    }),
  })

  const result: ApiResponse<T> = await response.json()
  if (!result.success) throw new Error(result.data.message)
  return result.data
}
```

### Service Pattern
```typescript
// services/feature.service.ts
export const featureService = {
  list: async () => apiRequest<Item[]>('feature_list'),
  get: async (id: number) => apiRequest<Item>('feature_get', { id }),
  create: async (data: CreateData) => apiRequest('feature_create', data),
  update: async (id: number, data: UpdateData) => apiRequest('feature_update', { id, ...data }),
  delete: async (id: number) => apiRequest('feature_delete', { id }),
}
```

### Action Naming
- Use thunks for async operations
- Middleware for complex flows (if using Redux)
- Keep actions pure and simple

---

## Forbidden Practices

### Absolutely Forbidden

#### 1. Comments in Code
**NO COMMENTS ALLOWED**

```typescript
❌ // This function calculates the total
❌ /* Calculate user age */

✅ Use descriptive names instead:
function calculateOrderTotal(items: Item[]): number {
  // Clear from function name
}
```

Reasons:
- Makes code messy
- Good code is self-documenting
- Comments become outdated
- Forces better naming

#### 2. Files Over 250 Lines
**HARD LIMIT**: 250 lines per file

If exceeded, split immediately.

#### 3. Using 'any' Type
**NEVER USE 'any'**

```typescript
❌ const data: any
❌ function process(item: any)

✅ const data: Widget
✅ function process<T>(item: T)
✅ const data: unknown // If truly unknown
```

#### 4. Router Libraries
**NO react-router-dom or similar**

Use Zustand state management:

```typescript
// ✅ State-based navigation
const { currentView, setCurrentView } = useUiStore()
setCurrentView('widget-manager')

// ❌ No router
<BrowserRouter>
  <Route path="/widgets" />
</BrowserRouter>
```

Reason: Dangerous in WordPress plugin context

#### 5. Buttons with Borders
**NO border/outline buttons**

```typescript
❌ outline: 'border border-gray-300'
✅ subtle: 'bg-gray-100 hover:bg-gray-200'
```

Reason: Horrible visual appearance

#### 6. More than 4 useState
**Use useReducer instead**

```typescript
❌ Too many useState calls (5+)
✅ Use useReducer for complex state
```

---

## Best Practices Summary

### DO ✅
- Follow atomic design
- Keep files under 250 lines
- Use TypeScript strictly (no 'any')
- Extract logic to custom hooks
- Use path aliases (@atoms, @services)
- Export through index files
- Use Zustand for global state
- Scope CSS under .pcm-admin-wrap
- Make UI responsive
- Handle loading/error states
- Use descriptive names (no comments needed)

### DON'T ❌
- Write comments in code
- Exceed 250 lines per file
- Use 'any' type
- Use react-router-dom
- Create bordered/outline buttons
- Use more than 4 useState without reducer
- Skip index.ts exports
- Hardcode values
- Ignore TypeScript errors
- Write messy, unclear code

---

## Code Review Checklist

Before committing code, verify:

- [ ] No file exceeds 250 lines
- [ ] No comments in code
- [ ] No 'any' types used
- [ ] All types defined in .d.ts files
- [ ] Components properly split (atoms → pages)
- [ ] Logic extracted to custom hooks (if complex)
- [ ] All exports through index.ts
- [ ] Path aliases used (@atoms, @services, etc.)
- [ ] No router library used
- [ ] Buttons have solid backgrounds (no borders)
- [ ] State properly managed (useState/useReducer/Zustand)
- [ ] Responsive design implemented
- [ ] WordPress integration via window.pcmConfig
- [ ] CSS scoped under .pcm-admin-wrap
- [ ] Error handling in place
- [ ] TypeScript compiles without errors
- [ ] Code is self-documenting (clear names)

---

## Examples

### Good Component Example
```typescript
import { Stack, Group, Text } from '@mantine/core'
import { IconEdit, IconTrash } from '@tabler/icons-react'
import { Card, Button, Badge } from '@atoms/index'
import type { Widget } from '@/types'

interface WidgetItemProps {
  widget: Widget
  onEdit: (id: number) => void
  onDelete: (id: number) => void
}

export function WidgetItem({ widget, onEdit, onDelete }: WidgetItemProps) {
  const handleEdit = () => onEdit(widget.id)
  const handleDelete = () => onDelete(widget.id)

  return (
    <Card>
      <Group justify="space-between">
        <div>
          <Text fw={600}>{widget.name}</Text>
          <Badge variant={widget.is_active ? 'success' : 'neutral'}>
            {widget.is_active ? 'Active' : 'Inactive'}
          </Badge>
        </div>
        <Group gap="xs">
          <Button variant="accent" onClick={handleEdit} size="sm">
            <IconEdit size={14} />
          </Button>
          <Button variant="danger" onClick={handleDelete} size="sm">
            <IconTrash size={14} />
          </Button>
        </Group>
      </Group>
    </Card>
  )
}
```

### Good Service Example
```typescript
import { apiRequest } from './api'
import type { Widget, WidgetCreateResponse } from '@/types'

export const widgetService = {
  list: async (): Promise<Widget[]> => {
    return apiRequest<Widget[]>('widget_list')
  },

  create: async (data: Partial<Widget>): Promise<WidgetCreateResponse> => {
    return apiRequest<WidgetCreateResponse>('widget_create', data)
  },

  delete: async (id: number): Promise<void> => {
    return apiRequest<void>('widget_delete', { id })
  },
}
```

### Good Hook Example
```typescript
import { useReducer, useEffect } from 'react'
import { useWidgetStore } from '@stores/widget.store'

interface FormState {
  name: string
  slug: string
  postType: string
  columns: number
}

type FormAction =
  | { type: 'SET_NAME'; payload: string }
  | { type: 'SET_SLUG'; payload: string }
  | { type: 'RESET' }

const reducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case 'SET_NAME':
      return { ...state, name: action.payload }
    case 'SET_SLUG':
      return { ...state, slug: action.payload }
    case 'RESET':
      return initialState
    default:
      return state
  }
}

const initialState: FormState = {
  name: '',
  slug: '',
  postType: 'page',
  columns: 3,
}

export function useWidgetForm() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { createWidget } = useWidgetStore()

  const handleSave = async () => {
    await createWidget(state)
    dispatch({ type: 'RESET' })
  }

  return { state, dispatch, handleSave }
}
```

---

## Conclusion

These coding standards ensure:
- **Clean**: No clutter, no comments, clear structure
- **Maintainable**: Small files, focused components
- **Type-safe**: Full TypeScript coverage
- **Performant**: Optimized rendering and bundling
- **Professional**: Consistent, polished UI
- **Scalable**: Easy to extend and modify

Follow these rules strictly to maintain code quality and team consistency.
