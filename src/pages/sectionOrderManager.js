export const sectionOrderManager = {
  init() {
    this.setupDragAndDrop();
  },

  setupDragAndDrop() {
    const sectionOrderItems = document.querySelectorAll('.section-order-item');
    const container = document.querySelector('.section-order');
    
    // Keep track of the dragged element and its original position
    this.draggedElement = null;
    this.placeholder = null;
    
    sectionOrderItems.forEach(item => {
      // Make items draggable
      item.setAttribute('draggable', 'true');
      
      // Drag start event
      item.addEventListener('dragstart', (e) => {
        this.draggedElement = item;
        this.originalPosition = Array.from(sectionOrderItems).indexOf(item);
        
        // Create a placeholder element
        this.placeholder = document.createElement('div');
        this.placeholder.classList.add('section-order-item', 'placeholder');
        this.placeholder.style.height = `${item.offsetHeight}px`;
        this.placeholder.style.opacity = '0.4';
        this.placeholder.style.background = 'var(--gray-200)';
        this.placeholder.style.border = '2px dashed var(--gray-400)';
        
        // Set the drag image
        e.dataTransfer.setDragImage(item, 0, 0);
        
        // Add a class to indicate the item is being dragged
        setTimeout(() => {
          item.classList.add('dragging');
        }, 0);
      });
      
      // Drag end event
      item.addEventListener('dragend', () => {
        this.draggedElement.classList.remove('dragging');
        if (this.placeholder && this.placeholder.parentNode) {
          this.placeholder.parentNode.removeChild(this.placeholder);
        }
        
        // Update the order in the preview
        this.updateSectionOrder();
      });
    });

    // Drag over event
    container.addEventListener('dragover', this.handleDragOver.bind(this));
  },

  handleDragOver(e) {
    e.preventDefault();
    
    if (!this.draggedElement) return;
    
    const items = Array.from(document.querySelectorAll('.section-order-item:not(.dragging):not(.placeholder)'));
    
    const afterElement = this.getDragAfterElement(document.querySelector('.section-order'), e.clientY, items);

    if (afterElement == null) {
      document.querySelector('.section-order').appendChild(this.placeholder);
    } else {
      document.querySelector('.section-order').insertBefore(this.placeholder, afterElement);
    }
  },

  getDragAfterElement(container, y, items) {
    // Get the element after which to insert the dragged item
    const draggableElements = items;
    
    return draggableElements.reduce((closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
  },

  updateSectionOrder() {
    const sectionOrder = [];
    document.querySelectorAll('.section-order-item').forEach(item => {
      sectionOrder.push(item.dataset.section);
    });

    // Save the new order to localStorage for persistence
    localStorage.setItem('sectionOrder', JSON.stringify(sectionOrder));

    // Update the preview with the new order
    const previewUpdater = window.previewUpdater || (window.previewUpdater = {});
    if (previewUpdater.applySectionOrder) {
      previewUpdater.applySectionOrder(sectionOrder);
    }
  },

  // Load the section order from localStorage
  loadSectionOrder() {
    const savedOrder = JSON.parse(localStorage.getItem('sectionOrder'));
    if (savedOrder) {
      const previewUpdater = window.previewUpdater || (window.previewUpdater = {});
      if (previewUpdater.applySectionOrder) {
        previewUpdater.applySectionOrder(savedOrder);
      }
    }
  }
};

// Call the loadSectionOrder method after the page loads to apply saved order
document.addEventListener('DOMContentLoaded', () => {
  sectionOrderManager.loadSectionOrder();
});
