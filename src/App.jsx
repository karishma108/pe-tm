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

export default function App() {
  const [dark, setDark] = useState(
    typeof window !== 'undefined' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const [selectedKey, setSelectedKey] = useState('airtel');
  const [search, setSearch] = useState('');

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
          }}
        >
          <Space size="middle">
            <Avatar
              shape="square"
              size={32}
              style={{ backgroundColor: '#1677ff' }}
              icon={<ReadOutlined />}
            />
            <div style={{ lineHeight: 1.2 }}>
              <Text strong style={{ fontSize: 16 }}>
                PE-TM Binding Documentation
              </Text>
              <br />
              <Text type="secondary" style={{ fontSize: 12 }}>
                Official operator guidelines for Distributed Ledger Technology (DLT)
              </Text>
            </div>
          </Space>

          <Space>
            <Tag color="blue" style={{ marginInlineEnd: 0 }}>
              {operators.length} portals
            </Tag>
            <Tooltip title={dark ? 'Switch to light mode' : 'Switch to dark mode'}>
              <Button
                type="text"
                icon={dark ? <SunOutlined /> : <MoonOutlined />}
                onClick={() => setDark(d => !d)}
              />
            </Tooltip>
          </Space>
        </Header>

        <Layout>
          {/* Sidebar: search + operator list */}
          <Sider
            width={300}
            breakpoint="md"
            collapsedWidth={0}
            style={{
              borderRight: `1px solid ${dark ? '#303030' : '#f0f0f0'}`,
              height: 'calc(100vh - 56px)',
              position: 'sticky',
              top: 56,
              overflow: 'auto',
            }}
          >
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
                onSelect={({ key }) => setSelectedKey(key)}
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
          </Sider>

          {/* Main content: PDF viewer */}
          <Content style={{ padding: 24 }}>
            {selectedOperator ? (
              <Card
                variant="outlined"
                styles={{ body: { padding: 0 } }}
                title={
                  <Space>
                    <FilePdfOutlined style={{ color: '#cf1322', fontSize: 18 }} />
                    <span>{selectedOperator.name} — PE-TM Binding Documentation</span>
                  </Space>
                }
                extra={
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
                }
              >
                <div style={{ padding: '12px 24px' }}>
                  <Text type="secondary">{selectedOperator.desc}</Text>
                </div>
                <Divider style={{ margin: 0 }} />
                <iframe
                  src={`/${selectedOperator.pdf}`}
                  title={`${selectedOperator.name} DLT guidelines`}
                  style={{
                    display: 'block',
                    width: '100%',
                    height: 'calc(100vh - 240px)',
                    minHeight: 520,
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
