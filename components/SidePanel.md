# SidePanel Component

A highly flexible, animated side panel component for React/Next.js applications using Framer Motion.

## Features

- ✨ **Fully Animated** - Smooth open/close animations with spring physics
- 🎛️ **Highly Configurable** - Control position, size, behavior, and appearance  
- 📱 **Responsive** - Adapts to different screen sizes
- 🔄 **Two Modes** - Overlay content or push it aside
- 🎨 **Customizable** - Accept children and className for full styling control
- ⚡ **Portal-based** - Uses createPortal for proper z-index management
- 🎯 **TypeScript** - Full type safety and intellisense

## Basic Usage

```tsx
import SidePanel from '@/components/SidePanel';
// or
import { SidePanel } from '@/components/ui';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        Open Panel
      </button>
      
      <SidePanel
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        position="right"
        widthPercentage={30}
      >
        <div className="p-6">
          <h2>Panel Content</h2>
          <p>Your custom content here...</p>
        </div>
      </SidePanel>
    </>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | `boolean` | - | **Required.** Whether the panel is open |
| `onClose` | `() => void` | - | **Required.** Function to close the panel |
| `position` | `"left" \| "right"` | `"right"` | Panel position |
| `widthPercentage` | `number` | `30` | Panel width as % of viewport |
| `heightPercentage` | `number` | `80` | Panel height as % of viewport |
| `overlay` | `boolean` | `true` | Overlay content or push it aside |
| `className` | `string` | `""` | Custom CSS classes |
| `children` | `ReactNode` | - | **Required.** Panel content |
| `showCloseButton` | `boolean` | `true` | Show built-in close button |
| `closeButtonContent` | `ReactNode` | - | Custom close button content |
| `zIndex` | `number` | `1000` | Panel z-index |
| `animationDuration` | `number` | `0.3` | Animation duration in seconds |
| `backdropBlur` | `boolean` | `true` | Enable backdrop blur (overlay mode) |
| `backdropOpacity` | `number` | `0.5` | Backdrop opacity (0-1) |

## Advanced Examples

### Navigation Panel (Left Side)
```tsx
<SidePanel
  isOpen={navOpen}
  onClose={() => setNavOpen(false)}
  position="left"
  widthPercentage={25}
  heightPercentage={90}
  overlay={false} // Push content aside
  className="bg-gradient-to-b from-blue-50 to-blue-100"
>
  <nav className="p-6">
    {/* Navigation items */}
  </nav>
</SidePanel>
```

### Settings Panel (Right Side)
```tsx
<SidePanel
  isOpen={settingsOpen}
  onClose={() => setSettingsOpen(false)}
  position="right"
  widthPercentage={35}
  heightPercentage={85}
  animationDuration={0.4}
  backdropOpacity={0.3}
  className="bg-white dark:bg-neutral-900"
>
  <div className="p-6 h-full overflow-y-auto">
    {/* Settings content */}
  </div>
</SidePanel>
```

### Custom Close Button
```tsx
<SidePanel
  isOpen={isOpen}
  onClose={onClose}
  showCloseButton={true}
  closeButtonContent={
    <div className="flex items-center gap-2">
      <X size={16} />
      <span>Close</span>
    </div>
  }
>
  {children}
</SidePanel>
```

## Styling Tips

### Custom Background
```tsx
<SidePanel
  className="bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-purple-900/20 dark:via-neutral-900 dark:to-pink-900/20 border-l-4 border-purple-500"
>
  {/* Content */}
</SidePanel>
```

### Full Height Content
```tsx
<SidePanel {...props}>
  <div className="h-full flex flex-col">
    <header className="p-6 border-b">
      <h2>Header</h2>
    </header>
    <main className="flex-1 p-6 overflow-y-auto">
      {/* Scrollable content */}
    </main>
    <footer className="p-6 border-t">
      <button>Action</button>
    </footer>
  </div>
</SidePanel>
```

## Technical Details

- **Portal Rendering**: Uses `createPortal` to render outside component tree
- **Body Manipulation**: In non-overlay mode, transforms `document.body`
- **Smooth Animations**: Uses Framer Motion spring physics
- **Responsive**: Automatically handles different screen sizes
- **Accessibility**: Includes proper ARIA labels and keyboard handling
- **Dark Mode**: Works seamlessly with Tailwind dark mode

## Performance Notes

- Component creates a single portal element that persists
- Body transformations are optimized with CSS transforms
- Animations use GPU acceleration for smooth performance
- Minimal re-renders with proper state management

## Browser Support

- Modern browsers with CSS transforms support
- React 18+ for createPortal improvements
- Framer Motion compatibility requirements