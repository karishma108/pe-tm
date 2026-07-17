import { useMemo, useState } from 'react';
import {
  ConfigProvider,
  theme as antdTheme,
  Layout,
  Menu,
  Input,
  Typography,
  Button,
  Space,
  Avatar,
  Empty,
  Card,
  Divider,
  Tooltip,
  Tag,
  Grid,
  Drawer,
} from 'antd';
import {
  FilePdfOutlined,
  DownloadOutlined,
  ExportOutlined,
  SearchOutlined,
  MoonOutlined,
  SunOutlined,
  ReadOutlined,
  FileSearchOutlined,
  MenuOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;

const operators = [
  {
    key: 'airtel',
    name: 'Airtel',
    desc: 'Airtel DLT Portal Guidelines',
    pdf: 'AIRTEL_PE-TM .pdf',
    color: '#e11d48',
    letter: 'A',
  },
  {
    key: 'jio',
    name: 'Jio',
    desc: 'Jio TrueConnect DLT Guidelines',
    pdf: 'JIO PE-TM Chain.pdf',
    color: '#1d4ed8',
    letter: 'J',
  },
  {
    key: 'smartping',
    name: 'Smartping',
    desc: 'Smartping DLT Guidelines',
    pdf: 'Smartping PE-TM Mapping.pdf',
    color: '#ea580c',
    letter: 'S',
  },
  {
    key: 'vilpower',
    name: 'Vilpower',
    desc: 'Vilpower DLT Guidelines',
    pdf: 'Vilpower PE TM Chain.pdf',
    color: '#059669',
    letter: 'V',
  },
  {
    key: 'bsnl',
    name: 'BSNL',
    desc: 'BSNL DLT Guidelines',
    pdf: 'BSNL PE-TM Mapping .pdf',
    color: '#ca8a04',
    letter: 'B',
  },
];

const { useBreakpoint } = Grid;

export default function App() {
  const [dark, setDark] = useState(
    typeof window !== 'undefined' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const [selectedKey, setSelectedKey] = useState('airtel');
  const [search, setSearch] = useState('');
  const [drawerVisible, setDrawerVisible] = useState(false);

  const screens = useBreakpoint();

  const selectedOperator = operators.find(op => op.key === selectedKey);

  const filteredOperators = operators.filter(
    op =>
      op.name.toLowerCase().includes(search.toLowerCase()) ||
      op.desc.toLowerCase().includes(search.toLowerCase())
  );

  const menuItems = useMemo(
    () =>
      filteredOperators.map(op => ({
        key: op.key,
        icon: (
          <Avatar
            size={28}
            style={{
              backgroundColor: op.color,
              fontSize: 12,
              fontWeight: 600,
              verticalAlign: 'middle',
            }}
          >
            {op.letter}
          </Avatar>
        ),
        label: (
          <div style={{ lineHeight: 1.3, padding: '4px 0' }}>
            <div style={{ fontWeight: 500 }}>{op.name}</div>
            <Text type="secondary" style={{ fontSize: 12 }}>
              {op.desc}
            </Text>
          </div>
        ),
      })),
    [filteredOperators]
  );

  const renderSidebarContent = () => (
    <>
      <div style={{ padding: '16px 16px 8px' }}>
        <Input
          allowClear
          prefix={<SearchOutlined style={{ color: '#8c8c8c' }} />}
          placeholder="Search DLT portals..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {filteredOperators.length > 0 ? (
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          onSelect={({ key }) => {
            setSelectedKey(key);
            setDrawerVisible(false);
          }}
          items={menuItems}
          style={{ borderInlineEnd: 'none' }}
        />
      ) : (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="No portals match your search"
          style={{ marginTop: 48 }}
        />
      )}
    </>
  );

  return (
    <ConfigProvider
      theme={{
        algorithm: dark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
        token: {
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
          borderRadius: 6,
        },
        components: {
          Layout: {
            headerBg: dark ? '#141414' : '#ffffff',
            siderBg: dark ? '#141414' : '#ffffff',
            bodyBg: dark ? '#000000' : '#f5f5f5',
            headerHeight: 56,
            headerPadding: '0 24px',
          },
          Menu: {
            itemHeight: 56,
            itemBg: 'transparent',
          },
        },
      }}
    >
      <Layout style={{ minHeight: '100vh' }}>
        {/* Top header */}
        <Header
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: `1px solid ${dark ? '#303030' : '#f0f0f0'}`,
            position: 'sticky',
            top: 0,
            zIndex: 10,
            padding: screens.xs ? '0 12px' : '0 24px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0, overflow: 'hidden' }}>
            {!screens.md && (
              <Button
                type="text"
                icon={<MenuOutlined />}
                onClick={() => setDrawerVisible(true)}
                style={{ fontSize: '18px', flexShrink: 0 }}
              />
            )}
            {screens.sm && (
              <Avatar
                shape="square"
                size={32}
                style={{ backgroundColor: '#1677ff', flexShrink: 0 }}
                icon={<ReadOutlined />}
              />
            )}
            <div style={{ lineHeight: 1.2, minWidth: 0 }}>
              <Text strong style={{ fontSize: screens.xs ? 14 : 16, display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {screens.xs ? 'PE-TM Guidelines' : 'PE-TM Binding Documentation'}
              </Text>
              {screens.sm && (
                <Text type="secondary" style={{ fontSize: 12, display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  Official operator guidelines for Distributed Ledger Technology (DLT)
                </Text>
              )}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            {screens.sm && (
              <Tag color="blue" style={{ marginInlineEnd: 0 }}>
                {operators.length} portals
              </Tag>
            )}
            <Tooltip title={dark ? 'Switch to light mode' : 'Switch to dark mode'}>
              <Button
                type="text"
                icon={dark ? <SunOutlined /> : <MoonOutlined />}
                onClick={() => setDark(d => !d)}
              />
            </Tooltip>
          </div>
        </Header>

        <Layout>
          {/* Sidebar on desktop */}
          {screens.md && (
            <Sider
              width={300}
              style={{
                borderRight: `1px solid ${dark ? '#303030' : '#f0f0f0'}`,
                height: 'calc(100vh - 56px)',
                position: 'sticky',
                top: 56,
                overflow: 'auto',
              }}
            >
              {renderSidebarContent()}
            </Sider>
          )}

          {/* Drawer on mobile */}
          <Drawer
            title="DLT Portals"
            placement="left"
            onClose={() => setDrawerVisible(false)}
            open={drawerVisible}
            width={280}
            styles={{ body: { padding: 0 } }}
          >
            {renderSidebarContent()}
          </Drawer>

          {/* Main content: PDF viewer */}
          <Content style={{ padding: screens.xs ? 12 : 24 }}>
            {selectedOperator ? (
              <Card
                variant="outlined"
                styles={{ body: { padding: 0 } }}
                title={
                  !screens.xs ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
                      <FilePdfOutlined style={{ color: '#cf1322', fontSize: 18, flexShrink: 0 }} />
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {selectedOperator.name} — PE-TM Binding Documentation
                      </span>
                    </div>
                  ) : null
                }
                extra={
                  !screens.xs ? (
                    <Space>
                      <Button
                        icon={<DownloadOutlined />}
                        href={`/${selectedOperator.pdf}`}
                        download={selectedOperator.pdf}
                      >
                        Download
                      </Button>
                      <Button
                        type="primary"
                        icon={<ExportOutlined />}
                        href={`/${selectedOperator.pdf}`}
                        target="_blank"
                      >
                        Open
                      </Button>
                    </Space>
                  ) : null
                }
              >
                {/* Mobile custom header */}
                {screens.xs && (
                  <div
                    style={{
                      padding: '12px 16px',
                      borderBottom: `1px solid ${dark ? '#303030' : '#f0f0f0'}`,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
                      <FilePdfOutlined style={{ color: '#cf1322', fontSize: 18, flexShrink: 0 }} />
                      <span style={{ fontWeight: 600, fontSize: 14, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {selectedOperator.name} Guidelines
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
                      <Button
                        size="small"
                        icon={<DownloadOutlined />}
                        href={`/${selectedOperator.pdf}`}
                        download={selectedOperator.pdf}
                        style={{ flex: 1 }}
                      >
                        Download
                      </Button>
                      <Button
                        size="small"
                        type="primary"
                        icon={<ExportOutlined />}
                        href={`/${selectedOperator.pdf}`}
                        target="_blank"
                        style={{ flex: 1 }}
                      >
                        Open
                      </Button>
                    </div>
                  </div>
                )}

                <div style={{ padding: screens.xs ? '12px 16px' : '12px 24px' }}>
                  <Text type="secondary" style={{ fontSize: screens.xs ? 12 : 14 }}>
                    {selectedOperator.desc}
                  </Text>
                </div>
                <Divider style={{ margin: 0 }} />
                <iframe
                  key={selectedOperator.key}
                  src={`/${selectedOperator.pdf}`}
                  title={`${selectedOperator.name} DLT guidelines`}
                  style={{
                    display: 'block',
                    width: '100%',
                    height: screens.xs ? 'calc(100vh - 280px)' : 'calc(100vh - 240px)',
                    minHeight: screens.xs ? 400 : 520,
                    border: 'none',
                  }}
                />
              </Card>
            ) : (
              <Card
                variant="outlined"
                style={{
                  height: 'calc(100vh - 104px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Empty
                  image={<FileSearchOutlined style={{ fontSize: 56, color: '#8c8c8c' }} />}
                  description={
                    <div style={{ maxWidth: 320, margin: '0 auto' }}>
                      <Title level={5}>Select a DLT Portal</Title>
                      <Text type="secondary">
                        Choose an operator from the list on the left to view its
                        PE-TM binding guidelines.
                      </Text>
                    </div>
                  }
                />
              </Card>
            )}
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}
