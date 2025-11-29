export interface RoleDefinition {
  name: string;
  description: string;
  mappedClass: string;
}

export interface DesignPatternScenario {
  id: string;
  title: string;
  category: 'Creational' | 'Structural' | 'Behavioral';
  description: string;
  mermaidCode: string;
  roles: RoleDefinition[];
}