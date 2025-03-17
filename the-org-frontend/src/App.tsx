import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Layout from './components/Layout';
import Navigation from './components/Navigation';
import Header from './components/Header';
import Org from './components/OrgChart/Org';

export default function FilesExample() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const orgChartRef = React.useRef(null);

  const handleZoomIn = () => {
    if (orgChartRef.current) {
      orgChartRef.current.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (orgChartRef.current) {
      orgChartRef.current.zoomOut();
    }
  };

  const handleFit = () => {
    if (orgChartRef.current) {
      orgChartRef.current.fit();
    }
  };

  const handleRotate = () => {
    if (orgChartRef.current) {
      orgChartRef.current.rotate();
    }
  };

  const handleCompact = () => {
    if (orgChartRef.current) {
      orgChartRef.current.compact();
    }
  };

  const handleSVG = () => {
    if (orgChartRef.current) {
      orgChartRef.current.exportSvg();
    }
  };

  const handlePNG = () => {
    if (orgChartRef.current) {
      orgChartRef.current.exportPNG();
    }
  };

  const handlePDF = () => {
    if (orgChartRef.current) {
      orgChartRef.current.exportPDF();
    }
  };

  const handleClearHighlights = () => {
    if (orgChartRef.current) {
      orgChartRef.current.clearHighlights();
    }
  };

  const handleExportNodeData = () => {
    if (orgChartRef.current) {
      orgChartRef.current.exportNodeData();
    }
  };

  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      {drawerOpen && (
        <Layout.SideDrawer onClose={() => setDrawerOpen(false)}>
          <Navigation
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            onFit={handleFit}
            onRotate={handleRotate}
            onCompact={handleCompact}
            onSVG={handleSVG}
            onPNG={handlePNG}
            onPDF={handlePDF}
            onClearHighlights={handleClearHighlights}
            onExportNodeData={handleExportNodeData}
          />
        </Layout.SideDrawer>
      )}
 
      <Layout.Root
        sx={[
          {
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'minmax(64px, 200px) minmax(450px, 1fr)',
              md: 'minmax(160px, 300px) minmax(600px, 1fr) minmax(300px, 420px)',
            },
          },
          drawerOpen && {
            height: '100vh',
            overflow: 'hidden',
          },
        ]}
      >
        <Layout.Header>
          <Header />
        </Layout.Header>
        <Layout.SideNav>
          <Navigation
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            onFit={handleFit}
            onRotate={handleRotate}
            onCompact={handleCompact}
            onSVG={handleSVG}
            onPNG={handlePNG}
            onPDF={handlePDF}
            onClearHighlights={handleClearHighlights}
            onExportNodeData={handleExportNodeData}
          />
        </Layout.SideNav>
        <Layout.Main>
          <Box
            sx={{
              width: '100vw',
              height: '100vh',
            }}
          >
            <Org ref={orgChartRef} />
          </Box>
        </Layout.Main>
      </Layout.Root>
    </CssVarsProvider>
  );
}