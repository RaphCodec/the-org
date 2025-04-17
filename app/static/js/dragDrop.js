let dragNode;
let dropNode;
let dragEnabled = false;
let dragStartX;
let dragStartY;
let isDragStarting = false;

let undoActions = [];
let redoActions = [];

function onDragStart(element, dragEvent, node) {
    dragNode = node;
    const width = dragEvent.subject.width;
    const half = width / 2;
    const x = dragEvent.x - half;
    dragStartX = x;
    dragStartY = parseFloat(dragEvent.y);
    isDragStarting = true;

    d3.select(element).classed('dragging', true);
  }

  function onDrag(element, dragEvent) {
    if (!dragNode) {
      return;
    }

    const state = chart.getChartState();
    const g = d3.select(element);

    // This condition is designed to run at the start of a drag only
    if (isDragStarting) {
      isDragStarting = false;
      document
        .querySelector('.chart-container')
        .classList.add('dragging-active');

      // This sets the Z-Index above all other nodes, by moving the dragged node to be the last-child.
      g.raise();

      const descendants = dragEvent.subject.descendants();
      const linksToRemove = [...(descendants || []), dragEvent.subject];
      const nodesToRemove = descendants.filter(
        (x) => x.data.id !== dragEvent.subject.id
      );

      // Remove all links associated with the dragging node
      state['linksWrapper']
        .selectAll('path.link')
        .data(linksToRemove, (d) => state.nodeId(d))
        .remove();

      // Remove all descendant nodes associated with the dragging node
      if (nodesToRemove) {
        state['nodesWrapper']
          .selectAll('g.node')
          .data(nodesToRemove, (d) => state.nodeId(d))
          .remove();
      }
    }

    dropNode = null;
    const cP = {
      width: dragEvent.subject.width,
      height: dragEvent.subject.height,
      left: dragEvent.x,
      right: dragEvent.x + dragEvent.subject.width,
      top: dragEvent.y,
      bottom: dragEvent.y + dragEvent.subject.height,
      midX: dragEvent.x + dragEvent.subject.width / 2,
      midY: dragEvent.y + dragEvent.subject.height / 2,
    };

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const allNodes = d3.selectAll('g.node:not(.dragging)');
    allNodes.select('rect').attr('fill', 'none');

    allNodes
      .filter(function (d2, i) {
        const cPInner = {
          left: d2.x,
          right: d2.x + d2.width,
          top: d2.y,
          bottom: d2.y + d2.height,
        };

        if (
          cP.midX > cPInner.left &&
          cP.midX < cPInner.right &&
          cP.midY > cPInner.top &&
          cP.midY < cPInner.bottom &&
          this.classList.contains('droppable')
        ) {
          dropNode = d2;
          return d2;
        }
      })
      .select('rect')
      .attr('fill', '#e4e1e1');

    dragStartX += parseFloat(dragEvent.dx);
    dragStartY += parseFloat(dragEvent.dy);
    g.attr('transform', 'translate(' + dragStartX + ',' + dragStartY + ')');
  }

  function onDragEnd(element, dragEvent) {
    document
      .querySelector('.chart-container')
      .classList.remove('dragging-active');

    if (!dragNode) {
      return;
    }

    d3.select(element).classed('dragging', false);

    if (!dropNode) {
      chart.render();
      return;
    }

    if (dragEvent.subject.parent.id === dropNode.id) {
      chart.render();
      return;
    }

    d3.select(element).remove();

    const data = chart.getChartState().data;
    const node = data?.find((x) => x.id === dragEvent.subject.id);
    const oldParentId = node.parentId;
    node.parentId = dropNode.id;

    redoActions = [];
    undoActions.push({
      id: dragEvent.subject.id,
      parentId: oldParentId,
    });

    dropNode = null;
    dragNode = null;
    chart.render();
    updateDragActions();
  }

function toggleSectionButtons(disable) {
    const sections = ['Chart View', 'Actions', 'Exports'];
    sections.forEach((section) => {
        const detailsElement = Array.from(document.querySelectorAll('details')).find(
            (details) => details.querySelector('summary')?.textContent.trim() === section
        );

        if (detailsElement) {
            const buttons = detailsElement.querySelectorAll('ul a');
            buttons.forEach((button) => {
                if (disable) {
                    button.classList.add('menu-disabled');
                } else {
                    button.classList.remove('menu-disabled');
                }
            });
        }
    });
}

function enableDrag() {
    dragEnabled = true;
    const chartContainer = document.querySelector('.chart-container');
    const startDragButton = document.getElementById('startDragBtn');
    const finishDragButton = document.getElementById('finishDragBtn');
    const cancelDragButton = document.getElementById('cancelDragBtn');
    const undoButton = document.getElementById('undoBtn');
    const redoButton = document.getElementById('redoBtn');

    if (chartContainer) {
        chartContainer.classList.add('drag-enabled');
    }

    if (startDragButton) {
        startDragButton.classList.add('menu-disabled');
    }

    if (finishDragButton) {
        finishDragButton.classList.remove('menu-disabled');
    }

    if (cancelDragButton) {
        cancelDragButton.classList.remove('menu-disabled');
    }

    if (undoButton) {
        undoButton.classList.add('menu-disabled');
    }

    if (redoButton) {
        redoButton.classList.add('menu-disabled');
    }

    // Disable all buttons in the specified sections
    toggleSectionButtons(true);
}

function disableDrag() {
    dragEnabled = false;
    const chartContainer = document.querySelector('.chart-container');
    const startDragButton = document.getElementById('startDragBtn');
    const finishDragButton = document.getElementById('finishDragBtn');
    const cancelDragButton = document.getElementById('cancelDragBtn');
    const undoButton = document.getElementById('undoBtn');
    const redoButton = document.getElementById('redoBtn');

    if (chartContainer) {
        chartContainer.classList.remove('drag-enabled');
    }

    if (startDragButton) {
        startDragButton.classList.remove('menu-disabled');
    }

    if (finishDragButton) {
        finishDragButton.classList.add('menu-disabled');
    }

    if (cancelDragButton) {
        cancelDragButton.classList.add('menu-disabled');
    }

    if (undoButton) {
        undoButton.classList.add('menu-disabled');
    }

    if (redoButton) {
        redoButton.classList.add('menu-disabled');
    }

    // Re-enable all buttons in the specified sections
    toggleSectionButtons(false);

    undoActions = [];
    redoActions = [];
    updateDragActions();
}

  function cancelDrag() {
    if (undoActions.length === 0) {
      disableDrag();
      return;
    }

    const data = chart.getChartState().data;
    undoActions.reverse().forEach((action) => {
      const node = data.find((x) => x.id === action.id);
      node.parentId = action.parentId;
    });

    disableDrag();
    chart.render();
  }

  function undo() {
    const action = undoActions.pop();
    if (action) {
      const node = chart.getChartState().data.find((x) => x.id === action.id);
      const currentParentId = node.parentId;
      const previousParentId = action.parentId;
      action.parentId = currentParentId;
      node.parentId = previousParentId;

      redoActions.push(action);
      chart.render();
      updateDragActions();
    }
  }

  function redo() {
    const action = redoActions.pop();
    if (action) {
      const node = chart.getChartState().data.find((x) => x.id === action.id);
      const currentParentId = node.parentId;
      const previousParentId = action.parentId;
      action.parentId = currentParentId;
      node.parentId = previousParentId;
      undoActions.push(action);
      chart.render();
      updateDragActions();
    }
  }

  function updateDragActions() {
    const undoButton = document.getElementById('undoBtn');
    const redoButton = document.getElementById('redoBtn');

    if (undoButton) {
        if (undoActions.length === 0) {
            undoButton.classList.add('menu-disabled');
        } else {
            undoButton.classList.remove('menu-disabled');
        }
    }

    if (redoButton) {
        if (redoActions.length === 0) {
            redoButton.classList.add('menu-disabled');
        } else {
            redoButton.classList.remove('menu-disabled');
        }
    }
}

function initializeButtonStates() {
    const finishDragButton = document.getElementById('finishDragBtn');
    const cancelDragButton = document.getElementById('cancelDragBtn');
    const undoButton = document.getElementById('undoBtn');
    const redoButton = document.getElementById('redoBtn');

    if (finishDragButton) {
        finishDragButton.classList.add('menu-disabled');
    }

    if (cancelDragButton) {
        cancelDragButton.classList.add('menu-disabled');
    }

    if (undoButton) {
        undoButton.classList.add('menu-disabled');
    }

    if (redoButton) {
        redoButton.classList.add('menu-disabled');
    }
}

// Ensure the DOM is loaded before initializing button states
document.addEventListener("DOMContentLoaded", () => {
    initializeButtonStates();
});