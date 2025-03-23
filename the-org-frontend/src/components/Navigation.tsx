import * as React from 'react';
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListSubheader from '@mui/joy/ListSubheader';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemContent from '@mui/joy/ListItemContent';

import FolderRoundedIcon from '@mui/icons-material/FolderRounded';
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import AccountTreeRoundedIcon from '@mui/icons-material/AccountTreeRounded';
import FitScreenIcon from '@mui/icons-material/FitScreen';
import CropRotateIcon from '@mui/icons-material/CropRotate';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import EditIcon from '@mui/icons-material/Edit';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import MediationIcon from '@mui/icons-material/Mediation';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ImageIcon from '@mui/icons-material/Image';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import DataObjectIcon from '@mui/icons-material/DataObject';

export default function Navigation({ onZoomIn, onZoomOut, onFit, onRotate, onCompact, onSVG, onPNG, onPDF, onClearHighlights, onExportNodeData, onRemoveSelected, onEditNode }) {
  return (
    <List size="sm" sx={{ '--ListItem-radius': '8px', '--List-gap': '2px' }}>
      <ListItem nested>
        <ListSubheader sx={{ letterSpacing: '2px', fontWeight: '800' }}>
          Chart View
        </ListSubheader>
        <List
          aria-labelledby="nav-list-browse"
          sx={{ '& .JoyListItemButton-root': { p: '8px' } }}
        >
          <ListItem>
            <ListItemButton onClick={onFit}>
              <ListItemDecorator>
                <FitScreenIcon fontSize="small" />
              </ListItemDecorator>
              <ListItemContent>Fit</ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton onClick={onRotate}>
              <ListItemDecorator>
                <CropRotateIcon fontSize="small" />
              </ListItemDecorator>
              <ListItemContent>Rotate</ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton onClick={onCompact}>
              <ListItemDecorator>
                <AccountTreeRoundedIcon fontSize="small" />
              </ListItemDecorator>
              <ListItemContent>Compact</ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton onClick={onZoomIn}>
              <ListItemDecorator>
                <ZoomInIcon fontSize="small" />
              </ListItemDecorator>
              <ListItemContent>Zoom In</ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton onClick={onZoomOut}>
              <ListItemDecorator>
                <ZoomOutIcon fontSize="small" />
              </ListItemDecorator>
              <ListItemContent>Zoom Out</ListItemContent>
            </ListItemButton>
          </ListItem>
        </List>
      </ListItem>

      <ListItem nested sx={{ mt: 2 }}>
        <ListSubheader sx={{ letterSpacing: '2px', fontWeight: '800' }}>
          Node Actions
        </ListSubheader>

        <List
          aria-labelledby="nav-list-tags"
          size="sm"
          sx={{
            '--ListItemDecorator-size': '32px',
            '& .JoyListItemButton-root': { p: '8px' },
          }}
        >
          <ListItem>
            <ListItemButton onClick={onEditNode}>
              <ListItemDecorator>
                <EditIcon fontSize="small" />
              </ListItemDecorator>
              <ListItemContent>Edit</ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton>
              <ListItemDecorator>
                <PersonAddIcon fontSize="small" />
              </ListItemDecorator>
              <ListItemContent>Add</ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton onClick={onRemoveSelected}>
              <ListItemDecorator>
                <PersonRemoveIcon fontSize="small" />
              </ListItemDecorator>
              <ListItemContent>Remove</ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton>
              <ListItemDecorator>
                <MediationIcon fontSize="small" />
              </ListItemDecorator>
              <ListItemContent>Show Lineage</ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton onClick={onClearHighlights}>
              <ListItemDecorator>
                <UnpublishedIcon fontSize="small" />
              </ListItemDecorator>
              <ListItemContent>Deselect All</ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListSubheader sx={{ letterSpacing: '2px', fontWeight: '800' }}>
            Exports
          </ListSubheader>

          <ListItem>
            <ListItemButton onClick={onPNG}>
              <ListItemDecorator>
                <ImageIcon fontSize="small" />
              </ListItemDecorator>
              <ListItemContent>PNG</ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton onClick={onSVG}>
              <ListItemDecorator>
                <PhotoLibraryIcon fontSize="small" />
              </ListItemDecorator>
              <ListItemContent>SVG</ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton onClick={onPDF}>
              <ListItemDecorator>
                <PictureAsPdfIcon fontSize="small" />
              </ListItemDecorator>
              <ListItemContent>PDF</ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton onClick={onExportNodeData}>
              <ListItemDecorator>
                <DataObjectIcon fontSize="small" />
              </ListItemDecorator>
              <ListItemContent>Data</ListItemContent>
            </ListItemButton>
          </ListItem>
        </List>
      </ListItem>
    </List>
  );
}
