import React, { useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  TextInput,
  ActionIcon,
  useMantineColorScheme,
  Title,
  Text,
  Button,
  Group,
  Stack,
  UnstyledButton,
  Box,
  Center,
  ThemeIcon
} from '@mantine/core';
import {
  IconSearch,
  IconSun,
  IconMoon,
  IconFileText,
  IconDownload,
  IconExternalLink,
  IconBook
} from '@tabler/icons-react';

const operators = [
  {
    key: 'airtel',
    name: 'Airtel',
    desc: 'Airtel DLT Portal Guidelines',
    pdf: 'AIRTEL_PE-TM .pdf',
    color: '#ed1c24',
    bgGradient: 'linear-gradient(135deg, #ed1c24, #b91c1c)',
    letter: 'A'
  },
  {
    key: 'jio',
    name: 'Jio',
    desc: 'Jio TrueConnect DLT Guidelines',
    pdf: 'JIO PE-TM Chain.pdf',
    color: '#0050b3',
    bgGradient: 'linear-gradient(135deg, #0050b3, #003a82)',
    letter: 'J'
  },
  {
    key: 'smartping',
    name: 'Smartping',
    desc: 'Smartping DLT Guidelines',
    pdf: 'Smartping PE-TM Mapping.pdf',
    color: '#ff6b35',
    bgGradient: 'linear-gradient(135deg, #ff6b35, #e55a2b)',
    letter: 'SP'
  },
  {
    key: 'vilpower',
    name: 'Vilpower',
    desc: 'Vilpower DLT Guidelines',
    pdf: 'Vilpower PE TM Chain.pdf',
    color: '#10b981',
    bgGradient: 'linear-gradient(135deg, #10b981, #059669)',
    letter: 'V'
  },
  {
    key: 'bsnl',
    name: 'BSNL',
    desc: 'BSNL DLT Guidelines',
    pdf: 'BSNL PE-TM Mapping .pdf',
    color: '#f59e0b',
    bgGradient: 'linear-gradient(135deg, #f59e0b, #d97706)',
    letter: 'B'
  }
];

export default function App() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  const [selectedKey, setSelectedKey] = useState(null);
  const [search, setSearch] = useState('');

  const selectedOperator = operators.find(op => op.key === selectedKey);

  const filteredOperators = operators.filter(op =>
    op.name.toLowerCase().includes(search.toLowerCase()) ||
    op.desc.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box
      style={{
        minHeight: '100vh',
        background: dark 
          ? 'radial-gradient(ellipse at bottom, #111827 0%, #0f172a 100%)'
          : 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
        paddingBottom: '40px',
        transition: 'background 0.3s ease'
      }}
    >
      <Container size="xl" pt="md">
        {/* Header */}
        <Paper
          p="md"
          radius="lg"
          mb="xl"
          style={{
            background: dark ? 'rgba(30, 41, 59, 0.7)' : 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(12px)',
            border: `1px solid ${dark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'}`,
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.08)'
          }}
        >
          <Group justify="space-between">
            <Group>
              <ThemeIcon
                size="xl"
                radius="md"
                variant="gradient"
                gradient={{ from: 'indigo', to: 'cyan' }}
              >
                <IconBook size={24} />
              </ThemeIcon>
              <div>
                <Title order={3} style={{ fontWeight: 800 }}>
                  PE-TM Binding Documentation
                </Title>
                <Text size="xs" c="dimmed">
                  Official operator guidelines for Distributed Ledger Technology (DLT)
                </Text>
              </div>
            </Group>
            
            <ActionIcon
              variant="outline"
              color={dark ? 'yellow' : 'blue'}
              onClick={() => toggleColorScheme()}
              title="Toggle color scheme"
              size="lg"
              radius="md"
            >
              {dark ? <IconSun size={18} /> : <IconMoon size={18} />}
            </ActionIcon>
          </Group>
        </Paper>

        {/* Dashboard Grid */}
        <Grid gutter="md">
          {/* Left panel: search and operator list */}
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Paper
              p="md"
              radius="lg"
              style={{
                height: '100%',
                background: dark ? 'rgba(30, 41, 59, 0.5)' : 'rgba(255, 255, 255, 0.6)',
                backdropFilter: 'blur(8px)',
                border: `1px solid ${dark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'}`
              }}
            >
              <TextInput
                placeholder="Search DLT portals..."
                leftSection={<IconSearch size={16} />}
                mb="md"
                value={search}
                onChange={e => setSearch(e.target.value)}
                size="md"
                radius="md"
              />

              <Stack gap="xs">
                {filteredOperators.map(op => {
                  const isSelected = op.key === selectedKey;
                  return (
                    <UnstyledButton
                      key={op.key}
                      onClick={() => setSelectedKey(op.key)}
                      style={{
                        display: 'block',
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '12px',
                        background: isSelected
                          ? (dark ? 'rgba(99, 102, 241, 0.15)' : 'rgba(99, 102, 241, 0.08)')
                          : 'transparent',
                        border: `1px solid ${
                          isSelected
                            ? 'var(--mantine-color-indigo-filled)'
                            : (dark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)')
                        }`,
                        transition: 'all 0.2s ease',
                        cursor: 'pointer'
                      }}
                    >
                      <Group justify="space-between" wrap="nowrap">
                        <Group gap="sm" wrap="nowrap">
                          <ThemeIcon
                            size="md"
                            radius="md"
                            style={{
                              background: op.bgGradient,
                              color: '#fff',
                              fontWeight: 800,
                              fontSize: op.letter.length > 1 ? '11px' : '15px'
                            }}
                          >
                            {op.letter}
                          </ThemeIcon>
                          <div style={{ overflow: 'hidden' }}>
                            <Text size="sm" style={{ fontWeight: 600 }} truncate>
                              {op.name}
                            </Text>
                            <Text size="xs" c="dimmed" truncate>
                              {op.desc}
                            </Text>
                          </div>
                        </Group>
                      </Group>
                    </UnstyledButton>
                  );
                })}

                {filteredOperators.length === 0 && (
                  <Center p="xl">
                    <Stack align="center" gap="xs">
                      <IconFileText size={32} c="dimmed" />
                      <Text size="sm" c="dimmed">
                        No DLT Portals match search
                      </Text>
                    </Stack>
                  </Center>
                )}
              </Stack>
            </Paper>
          </Grid.Col>

          {/* Right panel: PDF viewer */}
          <Grid.Col span={{ base: 12, md: 8 }}>
            {selectedOperator ? (
              <Stack gap="md" style={{ height: '100%' }}>
                <Paper
                  p="md"
                  radius="lg"
                  style={{
                    background: dark ? 'rgba(30, 41, 59, 0.5)' : 'rgba(255, 255, 255, 0.6)',
                    backdropFilter: 'blur(8px)',
                    border: `1px solid ${dark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'}`
                  }}
                >
                  <Group justify="space-between">
                    <Group gap="xs">
                      <ThemeIcon size="md" color="red" variant="light">
                        <IconFileText size={16} />
                      </ThemeIcon>
                      <Text style={{ fontWeight: 600 }}>
                        {selectedOperator.name} - PE-TM Binding Documentation
                      </Text>
                    </Group>

                    <Group gap="xs">
                      <Button
                        component="a"
                        href={`/${selectedOperator.pdf}`}
                        download={selectedOperator.pdf}
                        variant="light"
                        leftSection={<IconDownload size={14} />}
                        size="xs"
                        radius="md"
                      >
                        Download
                      </Button>
                      <Button
                        component="a"
                        href={`/${selectedOperator.pdf}`}
                        target="_blank"
                        variant="outline"
                        leftSection={<IconExternalLink size={14} />}
                        size="xs"
                        radius="md"
                      >
                        Open Full
                      </Button>
                    </Group>
                  </Group>
                </Paper>

                <Paper
                  radius="lg"
                  style={{
                    flex: 1,
                    minHeight: '600px',
                    height: 'calc(100vh - 280px)',
                    overflow: 'hidden',
                    border: `1px solid ${dark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'}`
                  }}
                >
                  <iframe
                    src={`/${selectedOperator.pdf}`}
                    title={`${selectedOperator.name} DLT guidelines`}
                    style={{
                      width: '100%',
                      height: '100%',
                      border: 'none',
                      background: '#f8fafc'
                    }}
                  />
                </Paper>
              </Stack>
            ) : (
              <Paper
                p="xl"
                radius="lg"
                style={{
                  height: '100%',
                  minHeight: '600px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: dark ? 'rgba(30, 41, 59, 0.3)' : 'rgba(255, 255, 255, 0.4)',
                  backdropFilter: 'blur(8px)',
                  border: `1px solid ${dark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'}`
                }}
              >
                <Stack align="center" gap="sm">
                  <ThemeIcon
                    size={80}
                    radius="50%"
                    variant="light"
                    color="indigo"
                  >
                    <IconFileText size={40} />
                  </ThemeIcon>
                  <Title order={3} ta="center">
                    Select a DLT Portal
                  </Title>
                  <Text size="sm" c="dimmed" ta="center" style={{ maxWidth: 320 }}>
                    Choose an operator from the search selector on the left to view the guidelines for PE-TM Binding.
                  </Text>
                </Stack>
              </Paper>
            )}
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
}
