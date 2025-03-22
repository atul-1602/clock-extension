# Modern Clock & Task Manager Chrome Extension

A modern Chrome extension that combines a beautiful analog clock with productivity tools, featuring a task manager, quick shortcuts, and week progress tracking.

## ✨ Features

### 🕐 Clock & Date Dashboard
- Elegant analog clock with smooth animations
- Current day and date display
- Weekly progress tracker
- Clean, modern interface with blur-glass effect

### 📌 Quick Access Shortcuts
- Customizable sidebar for favorite websites
- Easy add/remove functionality
- Quick launch with single click
- Visual icons for each shortcut

### 📝 Task Management
- Two-section note system:
  - Tasks list for to-dos
  - Queries list for questions/notes
- Add, edit, and delete functionality
- Mark tasks as complete
- Persistent storage across sessions

## 🚀 Installation & Setup

### Method 1: Local Development
1. Clone the repository

2. Navigate to Chrome Extensions
   - Open Chrome browser
   - Go to `chrome://extensions/`
   - Enable "Developer mode" in the top right corner

3. Load the Extension
   - Click "Load unpacked"
   - Select the cloned project directory
   - The extension icon should appear in your Chrome toolbar

## 🎨 Customization Guide

### Modifying Colors
Navigate to `style.css` to customize the appearance:

### Changing Icons
1. Replace existing icons in the `icons` directory
2. Update manifest.json with new icon paths:

### Modifying Layout
Key CSS classes in `style.css`:
- `.main-container`: Overall layout
- `.clock-section`: Clock appearance
- `.shortcuts-section`: Sidebar styling
- `.notes-section`: Notes panel design

## 🔮 Future Scope

### Potential Enhancements
1. **Theme Customization**
   - Add light/dark mode toggle
   - Create custom theme presets
   - Allow user-defined color schemes

2. **Clock Features**
   - Multiple timezone support
   - Alarm functionality
   - Timer and stopwatch

3. **Task Management**
   - Categories/tags for tasks
   - Due dates and reminders
   - Task priority levels
   - Task sharing capabilities

4. **Shortcuts Enhancement**
   - Folder organization
   - Custom icons upload
   - Shortcut categories
   - Import/export functionality

5. **Data Management**
   - Cloud sync support
   - Data backup/restore
   - Cross-device synchronization

6. **UI/UX Improvements**
   - Customizable layouts
   - Widget resizing
   - Drag-and-drop interface
   - Keyboard shortcuts

7. **Integration Possibilities**
   - Calendar integration
   - Weather information
   - Email notifications
   - Todo list apps integration

### For Developers

#### Adding New Features
1. **Component Structure**
   - Main components are in separate HTML sections
   - Each feature has dedicated CSS classes
   - JavaScript functions are modular

2. **File Organization**
├── manifest.json
├── popup.html
├── style.css
├── popup.js
├── icons/
└── components/
├── clock/
├── shortcuts/
└── notes/

3. **Code Style Guide**
   - Use meaningful class names
   - Comment complex logic
   - Maintain modular structure
   - Follow consistent naming conventions

## 🛠️ Technical Requirements

- Chrome Browser (Version 88 or higher)
- Local storage for saving preferences
- Permissions required:
  - Storage (for saving tasks and shortcuts)
  - Tabs (for shortcut functionality)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 📞 Support

For issues or feature requests:
- Open an issue on GitHub
- Contact: your.email@example.com

## 🙏 Acknowledgments

- Icons provided by [Icon Source]
- Design inspiration from [Source]

## Images 
<img width="1789" alt="Screenshot 2025-03-22 at 1 13 13 PM" src="https://github.com/user-attachments/assets/9cb5dcb6-d15a-45f7-8583-2449c9e7c3db" />
