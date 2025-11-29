
import { DesignPatternScenario } from './types';

export const PATTERNS: DesignPatternScenario[] = [
  // ==================== 创建型模式 (Creational) ====================
  {
    id: 'singleton',
    title: '1. 单例模式 (Singleton)',
    category: 'Creational',
    description: '保证一个类仅有一个实例，并提供一个访问它的全局访问点。',
    mermaidCode: `classDiagram
    class Singleton {
        -static instance : Singleton
        -Singleton()
        +static getInstance() Singleton
        +operation()
    }
    note for Singleton "private constructor\nkeeps others from\ninstantiating it."
    `,
    roles: [
      { name: 'Singleton (单例)', mappedClass: 'Singleton', description: '定义一个 getInstance 操作，允许客户访问它的唯一实例。' }
    ]
  },
  {
    id: 'factory-method',
    title: '2. 工厂方法模式 (Factory Method)',
    category: 'Creational',
    description: '定义一个用于创建对象的接口，让子类决定实例化哪一个类。工厂方法使一个类的实例化延迟到其子类。',
    mermaidCode: `classDiagram
    class Creator {
        <<abstract>>
        +factoryMethod() Product
        +anOperation()
    }

    class ConcreteCreator {
        +factoryMethod() Product
    }

    class Product {
        <<interface>>
    }

    class ConcreteProduct {
    }

    Creator <|-- ConcreteCreator
    Product <|.. ConcreteProduct
    ConcreteCreator ..> ConcreteProduct : Creates
    `,
    roles: [
      { name: 'Product (抽象产品)', mappedClass: 'Product', description: '定义工厂方法所创建对象的接口。' },
      { name: 'ConcreteProduct (具体产品)', mappedClass: 'ConcreteProduct', description: '实现 Product 接口。' },
      { name: 'Creator (抽象创建者)', mappedClass: 'Creator', description: '声明工厂方法，该方法返回一个 Product 类型的对象。' },
      { name: 'ConcreteCreator (具体创建者)', mappedClass: 'ConcreteCreator', description: '重定义工厂方法以返回一个 ConcreteProduct 实例。' }
    ]
  },
  {
    id: 'abstract-factory',
    title: '3. 抽象工厂模式 (Abstract Factory)',
    category: 'Creational',
    description: '提供一个创建一系列相关或相互依赖对象的接口，而无需指定它们具体的类。',
    mermaidCode: `classDiagram
    class AbstractFactory {
        <<interface>>
        +createProductA() AbstractProductA
        +createProductB() AbstractProductB
    }

    class ConcreteFactory1 {
        +createProductA() AbstractProductA
        +createProductB() AbstractProductB
    }
    class ConcreteFactory2 {
        +createProductA() AbstractProductA
        +createProductB() AbstractProductB
    }

    class AbstractProductA {
        <<interface>>
    }
    class AbstractProductB {
        <<interface>>
    }

    class ProductA1 {
    }
    class ProductA2 {
    }
    class ProductB1 {
    }
    class ProductB2 {
    }

    AbstractFactory <|.. ConcreteFactory1
    AbstractFactory <|.. ConcreteFactory2
    AbstractProductA <|.. ProductA1
    AbstractProductA <|.. ProductA2
    AbstractProductB <|.. ProductB1
    AbstractProductB <|.. ProductB2

    ConcreteFactory1 ..> ProductA1
    ConcreteFactory1 ..> ProductB1
    ConcreteFactory2 ..> ProductA2
    ConcreteFactory2 ..> ProductB2
    `,
    roles: [
      { name: 'AbstractFactory (抽象工厂)', mappedClass: 'AbstractFactory', description: '声明创建抽象产品对象的操作接口。' },
      { name: 'ConcreteFactory (具体工厂)', mappedClass: 'ConcreteFactory1, ConcreteFactory2', description: '实现创建具体产品对象的操作。' },
      { name: 'AbstractProduct (抽象产品)', mappedClass: 'AbstractProductA, AbstractProductB', description: '为一类产品对象声明一个接口。' },
      { name: 'ConcreteProduct (具体产品)', mappedClass: 'ProductA1, ProductB1...', description: '定义一个将被相应的具体工厂创建的产品对象。' }
    ]
  },
  {
    id: 'builder',
    title: '4. 建造者模式 (Builder)',
    category: 'Creational',
    description: '将一个复杂对象的构建与它的表示分离，使得同样的构建过程可以创建不同的表示。',
    mermaidCode: `classDiagram
    class Director {
        -builder : Builder
        +construct()
    }

    class Builder {
        <<interface>>
        +buildPartA()
        +buildPartB()
        +getResult() Product
    }

    class ConcreteBuilder {
        +buildPartA()
        +buildPartB()
        +getResult() Product
    }

    class Product {
    }

    Director o-- Builder
    Builder <|.. ConcreteBuilder
    ConcreteBuilder ..> Product : Creates
    `,
    roles: [
      { name: 'Builder (抽象建造者)', mappedClass: 'Builder', description: '为创建一个 Product 对象的各个部件指定抽象接口。' },
      { name: 'ConcreteBuilder (具体建造者)', mappedClass: 'ConcreteBuilder', description: '实现 Builder 接口以构造和装配该产品的各个部件。' },
      { name: 'Director (指挥者)', mappedClass: 'Director', description: '构造一个使用 Builder 接口的对象。' },
      { name: 'Product (产品)', mappedClass: 'Product', description: '表示被构造的复杂对象。' }
    ]
  },
  {
    id: 'prototype',
    title: '5. 原型模式 (Prototype)',
    category: 'Creational',
    description: '用原型实例指定创建对象的种类，并且通过拷贝这些原型创建新的对象。',
    mermaidCode: `classDiagram
    class Prototype {
        <<interface>>
        +clone() Prototype
    }

    class ConcretePrototype1 {
        +clone() Prototype
    }

    class ConcretePrototype2 {
        +clone() Prototype
    }

    class Client {
        -prototype : Prototype
        +operation()
    }

    Prototype <|.. ConcretePrototype1
    Prototype <|.. ConcretePrototype2
    Client --> Prototype : Uses
    `,
    roles: [
      { name: 'Prototype (抽象原型)', mappedClass: 'Prototype', description: '声明一个克隆自身的接口。' },
      { name: 'ConcretePrototype (具体原型)', mappedClass: 'ConcretePrototype1, ConcretePrototype2', description: '实现一个克隆自身的操作。' },
      { name: 'Client (客户)', mappedClass: 'Client', description: '让一个原型克隆自身从而创建一个新的对象。' }
    ]
  },

  // ==================== 结构型模式 (Structural) ====================
  {
    id: 'adapter',
    title: '6. 适配器模式 (Adapter)',
    category: 'Structural',
    description: '将一个类的接口转换成客户希望的另外一个接口。Adapter 模式使得原本由于接口不兼容而不能一起工作的那些类可以一起工作。',
    mermaidCode: `classDiagram
    class Target {
        <<interface>>
        +request()
    }

    class Adapter {
        -adaptee : Adaptee
        +request()
    }

    class Adaptee {
        +specificRequest()
    }

    class Client {
    }

    Client --> Target
    Target <|.. Adapter
    Adapter --> Adaptee : Adapts
    `,
    roles: [
      { name: 'Target (目标接口)', mappedClass: 'Target', description: '定义 Client 使用的与特定领域相关的接口。' },
      { name: 'Client (客户)', mappedClass: 'Client', description: '与符合 Target 接口的对象协同。' },
      { name: 'Adaptee (被适配者)', mappedClass: 'Adaptee', description: '定义一个已经存在的接口，这个接口需要适配。' },
      { name: 'Adapter (适配器)', mappedClass: 'Adapter', description: '对 Adaptee 的接口与 Target 接口进行适配。' }
    ]
  },
  {
    id: 'bridge',
    title: '7. 桥接模式 (Bridge)',
    category: 'Structural',
    description: '将抽象部分与它的实现部分分离，使它们都可以独立地变化。',
    mermaidCode: `classDiagram
    class Abstraction {
        -imp : Implementor
        +operation()
    }

    class RefinedAbstraction {
        +operation()
    }

    class Implementor {
        <<interface>>
        +operationImp()
    }

    class ConcreteImplementorA {
        +operationImp()
    }
    class ConcreteImplementorB {
        +operationImp()
    }

    Abstraction o-- Implementor
    Abstraction <|-- RefinedAbstraction
    Implementor <|.. ConcreteImplementorA
    Implementor <|.. ConcreteImplementorB
    `,
    roles: [
      { name: 'Abstraction (抽象部分)', mappedClass: 'Abstraction', description: '定义抽象类的接口，维护一个指向 Implementor 类型对象的指针。' },
      { name: 'RefinedAbstraction (扩充抽象)', mappedClass: 'RefinedAbstraction', description: '扩充 Abstraction 定义的接口。' },
      { name: 'Implementor (实现部分)', mappedClass: 'Implementor', description: '定义实现类的接口，该接口不一定要与 Abstraction 的接口完全一致。' },
      { name: 'ConcreteImplementor (具体实现)', mappedClass: 'ConcreteImplementorA, ConcreteImplementorB', description: '实现 Implementor 接口并定义它的具体实现。' }
    ]
  },
  {
    id: 'composite',
    title: '8. 组合模式 (Composite)',
    category: 'Structural',
    description: '将对象组合成树形结构以表示“部分-整体”的层次结构。Composite 使得用户对单个对象和组合对象的使用具有一致性。',
    mermaidCode: `classDiagram
    class Component {
        <<interface>>
        +operation()
        +add(Component)
        +remove(Component)
        +getChild(int)
    }

    class Leaf {
        +operation()
    }

    class Composite {
        -children : List<Component>
        +operation()
        +add(Component)
        +remove(Component)
        +getChild(int)
    }

    Component <|.. Leaf
    Component <|.. Composite
    Composite o-- Component
    `,
    roles: [
      { name: 'Component (抽象构件)', mappedClass: 'Component', description: '为组合中的对象声明接口，在适当情况下，实现所有类共有接口的默认行为。' },
      { name: 'Leaf (叶子构件)', mappedClass: 'Leaf', description: '在组合中表示叶节点对象，叶节点没有子节点。' },
      { name: 'Composite (容器构件)', mappedClass: 'Composite', description: '定义有子部件的那些部件的行为，存储子部件。' }
    ]
  },
  {
    id: 'decorator',
    title: '9. 装饰模式 (Decorator)',
    category: 'Structural',
    description: '动态地给一个对象添加一些额外的职责。就增加功能来说，Decorator 模式相比生成子类更为灵活。',
    mermaidCode: `classDiagram
    class Component {
        <<interface>>
        +operation()
    }

    class ConcreteComponent {
        +operation()
    }

    class Decorator {
        <<abstract>>
        -component : Component
        +operation()
    }

    class ConcreteDecoratorA {
        +operation()
        +addedBehavior()
    }

    class ConcreteDecoratorB {
        +operation()
        +addedBehavior()
    }

    Component <|.. ConcreteComponent
    Component <|.. Decorator
    Decorator o-- Component
    Decorator <|-- ConcreteDecoratorA
    Decorator <|-- ConcreteDecoratorB
    `,
    roles: [
      { name: 'Component (抽象构件)', mappedClass: 'Component', description: '定义一个对象接口，可以给这些对象动态地添加职责。' },
      { name: 'ConcreteComponent (具体构件)', mappedClass: 'ConcreteComponent', description: '定义一个对象，可以给这个对象添加一些职责。' },
      { name: 'Decorator (抽象装饰类)', mappedClass: 'Decorator', description: '维持一个指向 Component 对象的引用，并定义一个与 Component 接口一致的接口。' },
      { name: 'ConcreteDecorator (具体装饰类)', mappedClass: 'ConcreteDecoratorA, ConcreteDecoratorB', description: '负责向构件添加新的职责。' }
    ]
  },
  {
    id: 'facade',
    title: '10. 外观模式 (Facade)',
    category: 'Structural',
    description: '为子系统中的一组接口提供一个一致的界面，Facade 模式定义了一个高层接口，这个接口使得这一子系统更加容易使用。',
    mermaidCode: `classDiagram
    class Facade {
        +operation()
    }

    class SubsystemClassA {
        +subOperationA()
    }
    class SubsystemClassB {
        +subOperationB()
    }
    class SubsystemClassC {
        +subOperationC()
    }

    Facade --> SubsystemClassA
    Facade --> SubsystemClassB
    Facade --> SubsystemClassC
    `,
    roles: [
      { name: 'Facade (外观角色)', mappedClass: 'Facade', description: '知道哪些子系统类负责处理请求，将客户的请求代理给适当的子系统对象。' },
      { name: 'Subsystem Classes (子系统类)', mappedClass: 'SubsystemClassA, B, C', description: '实现子系统的功能，处理 Facade 对象指派的任务。' }
    ]
  },
  {
    id: 'flyweight',
    title: '11. 享元模式 (Flyweight)',
    category: 'Structural',
    description: '运用共享技术有效地支持大量细粒度的对象。',
    mermaidCode: `classDiagram
    class FlyweightFactory {
        -flyweights : Map
        +getFlyweight(key)
    }

    class Flyweight {
        <<interface>>
        +operation(extrinsicState)
    }

    class ConcreteFlyweight {
        -intrinsicState
        +operation(extrinsicState)
    }

    class UnsharedConcreteFlyweight {
        -allState
        +operation(extrinsicState)
    }

    FlyweightFactory o-- Flyweight
    Flyweight <|.. ConcreteFlyweight
    Flyweight <|.. UnsharedConcreteFlyweight
    `,
    roles: [
      { name: 'Flyweight (抽象享元)', mappedClass: 'Flyweight', description: '描述一个接口，通过这个接口 flyweight 可以接受并作用于外部状态。' },
      { name: 'ConcreteFlyweight (具体享元)', mappedClass: 'ConcreteFlyweight', description: '实现 Flyweight 接口，并为内部状态（如果有的话）增加存储空间。' },
      { name: 'UnsharedConcreteFlyweight', mappedClass: 'UnsharedConcreteFlyweight', description: '并非所有的 Flyweight 子类都需要被共享。' },
      { name: 'FlyweightFactory (享元工厂)', mappedClass: 'FlyweightFactory', description: '创建和管理 flyweight 对象。' }
    ]
  },
  {
    id: 'proxy',
    title: '12. 代理模式 (Proxy)',
    category: 'Structural',
    description: '为其他对象提供一种代理以控制对这个对象的访问。',
    mermaidCode: `classDiagram
    class Subject {
        <<interface>>
        +request()
    }

    class RealSubject {
        +request()
    }

    class Proxy {
        -realSubject : RealSubject
        +request()
    }

    Subject <|.. RealSubject
    Subject <|.. Proxy
    Proxy --> RealSubject : Represents
    `,
    roles: [
      { name: 'Subject (抽象主题)', mappedClass: 'Subject', description: '定义 RealSubject 和 Proxy 的共用接口，这样就在任何使用 RealSubject 的地方都可以使用 Proxy。' },
      { name: 'RealSubject (真实主题)', mappedClass: 'RealSubject', description: '定义 Proxy 所代表的实体。' },
      { name: 'Proxy (代理)', mappedClass: 'Proxy', description: '保存一个引用使得代理可以访问实体，并提供一个与 Subject 的接口相同的接口，以便代理来替代实体。' }
    ]
  },

  // ==================== 行为型模式 (Behavioral) ====================
  {
    id: 'chain-of-responsibility',
    title: '13. 职责链模式 (Chain of Responsibility)',
    category: 'Behavioral',
    description: '使多个对象都有机会处理请求，从而避免请求的发送者和接收者之间的耦合关系。将这些对象连成一条链，并沿着这条链传递该请求，直到有一个对象处理它为止。',
    mermaidCode: `classDiagram
    class Handler {
        <<abstract>>
        -successor : Handler
        +setSuccessor(Handler)
        +handleRequest()
    }

    class ConcreteHandler1 {
        +handleRequest()
    }

    class ConcreteHandler2 {
        +handleRequest()
    }

    Handler o-- Handler : successor
    Handler <|-- ConcreteHandler1
    Handler <|-- ConcreteHandler2
    `,
    roles: [
      { name: 'Handler (抽象处理者)', mappedClass: 'Handler', description: '定义一个处理请求的接口，并可选地实现后继链。' },
      { name: 'ConcreteHandler (具体处理者)', mappedClass: 'ConcreteHandler1, ConcreteHandler2', description: '处理它所负责的请求；如果可处理则处理，否则将该请求转发给它的后继者。' },
      { name: 'Client (客户)', mappedClass: 'Client', description: '向链上的具体处理者对象提交请求。' }
    ]
  },
  {
    id: 'command',
    title: '14. 命令模式 (Command)',
    category: 'Behavioral',
    description: '将一个请求封装为一个对象，从而使你可用不同的请求对客户进行参数化；对请求排队或记录请求日志，以及支持可撤销的操作。',
    mermaidCode: `classDiagram
    class Invoker {
        -command : Command
        +setCommand(Command)
        +executeCommand()
    }

    class Command {
        <<interface>>
        +execute()
    }

    class ConcreteCommand {
        -receiver : Receiver
        +execute()
    }

    class Receiver {
        +action()
    }

    Invoker o-- Command
    Command <|.. ConcreteCommand
    ConcreteCommand --> Receiver
    `,
    roles: [
      { name: 'Command (抽象命令)', mappedClass: 'Command', description: '声明执行操作的接口。' },
      { name: 'ConcreteCommand (具体命令)', mappedClass: 'ConcreteCommand', description: '将一个接收者对象绑定于一个动作，调用接收者相应的操作。' },
      { name: 'Invoker (调用者)', mappedClass: 'Invoker', description: '要求该命令执行这个请求。' },
      { name: 'Receiver (接收者)', mappedClass: 'Receiver', description: '知道如何实施与执行一个请求相关的操作。' }
    ]
  },
  {
    id: 'interpreter',
    title: '15. 解释器模式 (Interpreter)',
    category: 'Behavioral',
    description: '给定一个语言，定义它的文法的一种表示，并定义一个解释器，这个解释器使用该表示来解释语言中的句子。',
    mermaidCode: `classDiagram
    class Context {
    }

    class AbstractExpression {
        <<abstract>>
        +interpret(Context)
    }

    class TerminalExpression {
        +interpret(Context)
    }

    class NonterminalExpression {
        +interpret(Context)
    }

    Client --> Context
    Client --> AbstractExpression
    AbstractExpression <|-- TerminalExpression
    AbstractExpression <|-- NonterminalExpression
    NonterminalExpression o-- AbstractExpression
    `,
    roles: [
      { name: 'AbstractExpression (抽象表达式)', mappedClass: 'AbstractExpression', description: '声明一个抽象的解释操作，这个接口为抽象语法树中所有的节点所共享。' },
      { name: 'TerminalExpression (终结符表达式)', mappedClass: 'TerminalExpression', description: '实现与文法中的终结符相关联的解释操作。' },
      { name: 'NonterminalExpression (非终结符表达式)', mappedClass: 'NonterminalExpression', description: '为文法中的非终结符实现解释操作。' },
      { name: 'Context (环境)', mappedClass: 'Context', description: '包含解释器之外的一些全局信息。' }
    ]
  },
  {
    id: 'iterator',
    title: '16. 迭代器模式 (Iterator)',
    category: 'Behavioral',
    description: '提供一种方法顺序访问一个聚合对象中各个元素，而又不需暴露该对象的内部表示。',
    mermaidCode: `classDiagram
    class Aggregate {
        <<interface>>
        +createIterator() Iterator
    }

    class ConcreteAggregate {
        +createIterator() Iterator
    }

    class Iterator {
        <<interface>>
        +first()
        +next()
        +isDone()
        +currentItem()
    }

    class ConcreteIterator {
    }

    Aggregate <|.. ConcreteAggregate
    Iterator <|.. ConcreteIterator
    ConcreteAggregate ..> ConcreteIterator : Creates
    ConcreteIterator --> ConcreteAggregate
    `,
    roles: [
      { name: 'Iterator (抽象迭代器)', mappedClass: 'Iterator', description: '定义访问和遍历元素的接口。' },
      { name: 'ConcreteIterator (具体迭代器)', mappedClass: 'ConcreteIterator', description: '实现迭代器接口，对该聚合遍历时跟踪当前位置。' },
      { name: 'Aggregate (抽象聚合)', mappedClass: 'Aggregate', description: '定义创建相应迭代器对象的接口。' },
      { name: 'ConcreteAggregate (具体聚合)', mappedClass: 'ConcreteAggregate', description: '实现创建相应迭代器的接口，该操作返回 ConcreteIterator 的一个适当的实例。' }
    ]
  },
  {
    id: 'mediator',
    title: '17. 中介者模式 (Mediator)',
    category: 'Behavioral',
    description: '用一个中介对象来封装一系列的对象交互。中介者使各对象不需要显式地相互引用，从而使其耦合松散，而且可以独立地改变它们之间的交互。',
    mermaidCode: `classDiagram
    class Mediator {
        <<interface>>
        +send(message, Colleague)
    }

    class ConcreteMediator {
        +send(message, Colleague)
    }

    class Colleague {
        -mediator : Mediator
    }

    class ConcreteColleagueA {
        +send(message)
        +notify(message)
    }

    class ConcreteColleagueB {
        +send(message)
        +notify(message)
    }

    Mediator <|.. ConcreteMediator
    Colleague <|-- ConcreteColleagueA
    Colleague <|-- ConcreteColleagueB
    ConcreteMediator --> ConcreteColleagueA
    ConcreteMediator --> ConcreteColleagueB
    Colleague --> Mediator
    `,
    roles: [
      { name: 'Mediator (抽象中介者)', mappedClass: 'Mediator', description: '定义一个接口用于与各同事对象通信。' },
      { name: 'ConcreteMediator (具体中介者)', mappedClass: 'ConcreteMediator', description: '通过协调各同事对象实现协作行为，了解并维护它的各个同事。' },
      { name: 'Colleague (抽象同事类)', mappedClass: 'Colleague', description: '定义同事类的接口，保存中介者对象。' },
      { name: 'ConcreteColleague (具体同事类)', mappedClass: 'ConcreteColleagueA, B', description: '每个同事对象在需要与其他的同事通信时，与它的中介者通信。' }
    ]
  },
  {
    id: 'memento',
    title: '18. 备忘录模式 (Memento)',
    category: 'Behavioral',
    description: '在不破坏封装性的前提下，捕获一个对象的内部状态，并在该对象之外保存这个状态。这样以后就可将该对象恢复到原先保存的状态。',
    mermaidCode: `classDiagram
    class Originator {
        -state
        +createMemento() Memento
        +setMemento(Memento)
    }

    class Memento {
        -state
        +getState()
        +setState()
    }

    class Caretaker {
        -memento : Memento
    }

    Originator ..> Memento : Creates
    Caretaker o-- Memento
    `,
    roles: [
      { name: 'Originator (原发器)', mappedClass: 'Originator', description: '创建一个备忘录，用以记录当前时刻的内部状态；使用备忘录恢复内部状态。' },
      { name: 'Memento (备忘录)', mappedClass: 'Memento', description: '存储 Originator 对象的内部状态。' },
      { name: 'Caretaker (负责人)', mappedClass: 'Caretaker', description: '负责保存好备忘录，不能对备忘录的内容进行操作或检查。' }
    ]
  },
  {
    id: 'observer',
    title: '19. 观察者模式 (Observer)',
    category: 'Behavioral',
    description: '定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都得到通知并被自动更新。',
    mermaidCode: `classDiagram
    class Subject {
        <<interface>>
        +attach(Observer)
        +detach(Observer)
        +notify()
    }

    class ConcreteSubject {
        -subjectState
        +getState()
        +setState()
    }

    class Observer {
        <<interface>>
        +update()
    }

    class ConcreteObserver {
        -observerState
        +update()
    }

    Subject <|.. ConcreteSubject
    Observer <|.. ConcreteObserver
    Subject --> Observer : notifies
    ConcreteObserver --> ConcreteSubject : observes
    `,
    roles: [
      { name: 'Subject (目标)', mappedClass: 'Subject', description: '目标知道它的观察者。可以有任意多个观察者观察同一个目标。提供注册和删除观察者对象的接口。' },
      { name: 'ConcreteSubject (具体目标)', mappedClass: 'ConcreteSubject', description: '将有关状态存入各 ConcreteObserver 对象；当它的状态发生改变时，向它的各个观察者发出通知。' },
      { name: 'Observer (观察者)', mappedClass: 'Observer', description: '为那些在目标发生改变时需获得通知的对象定义一个更新接口。' },
      { name: 'ConcreteObserver (具体观察者)', mappedClass: 'ConcreteObserver', description: '维护一个指向 ConcreteSubject 对象的引用；存储有关状态，这些状态应与目标的状态保持一致；实现 Observer 的更新接口。' }
    ]
  },
  {
    id: 'state',
    title: '20. 状态模式 (State)',
    category: 'Behavioral',
    description: '允许一个对象在其内部状态改变时改变它的行为。对象看起来似乎修改了它的类。',
    mermaidCode: `classDiagram
    class Context {
        -state : State
        +request()
    }

    class State {
        <<interface>>
        +handle(Context)
    }

    class ConcreteStateA {
        +handle(Context)
    }

    class ConcreteStateB {
        +handle(Context)
    }

    Context o-- State
    State <|.. ConcreteStateA
    State <|.. ConcreteStateB
    `,
    roles: [
      { name: 'Context (环境类)', mappedClass: 'Context', description: '定义客户感兴趣的接口；维护一个 ConcreteState 子类的实例，这个实例定义当前状态。' },
      { name: 'State (抽象状态)', mappedClass: 'State', description: '定义一个接口以封装与 Context 的一个特定状态相关的行为。' },
      { name: 'ConcreteState (具体状态)', mappedClass: 'ConcreteStateA, ConcreteStateB', description: '每一个子类实现一个与 Context 的一个状态相关的行为。' }
    ]
  },
  {
    id: 'strategy',
    title: '21. 策略模式 (Strategy)',
    category: 'Behavioral',
    description: '定义一系列的算法，把它们一个个封装起来，并且使它们可相互替换。本模式使得算法可独立于使用它的客户而变化。',
    mermaidCode: `classDiagram
    class Context {
        -strategy : Strategy
        +contextInterface()
    }

    class Strategy {
        <<interface>>
        +algorithmInterface()
    }

    class ConcreteStrategyA {
        +algorithmInterface()
    }

    class ConcreteStrategyB {
        +algorithmInterface()
    }

    Context o-- Strategy
    Strategy <|.. ConcreteStrategyA
    Strategy <|.. ConcreteStrategyB
    `,
    roles: [
      { name: 'Context (环境类)', mappedClass: 'Context', description: '用一个 ConcreteStrategy 对象来配置；维护一个对 Strategy 对象的引用。' },
      { name: 'Strategy (抽象策略)', mappedClass: 'Strategy', description: '定义所有支持的算法的公共接口。' },
      { name: 'ConcreteStrategy (具体策略)', mappedClass: 'ConcreteStrategyA, ConcreteStrategyB', description: '以 Strategy 接口实现具体算法。' }
    ]
  },
  {
    id: 'template-method',
    title: '22. 模板方法模式 (Template Method)',
    category: 'Behavioral',
    description: '定义一个操作中的算法的骨架，而将一些步骤延迟到子类中。模板方法使得子类可以不改变一个算法的结构即可重定义该算法的某些特定步骤。',
    mermaidCode: `classDiagram
    class AbstractClass {
        <<abstract>>
        +templateMethod()
        +primitiveOperation1()
        +primitiveOperation2()
    }

    class ConcreteClass {
        +primitiveOperation1()
        +primitiveOperation2()
    }

    AbstractClass <|-- ConcreteClass
    `,
    roles: [
      { name: 'AbstractClass (抽象类)', mappedClass: 'AbstractClass', description: '定义抽象的原语操作；实现一个模板方法，定义算法的骨架。' },
      { name: 'ConcreteClass (具体类)', mappedClass: 'ConcreteClass', description: '实现原语操作以完成算法中与特定子类相关的步骤。' }
    ]
  },
  {
    id: 'visitor',
    title: '23. 访问者模式 (Visitor)',
    category: 'Behavioral',
    description: '表示一个作用于某对象结构中的各元素的操作。它使你可以在不改变各元素的类的前提下定义作用于这些元素的新操作。',
    mermaidCode: `classDiagram
    class Visitor {
        <<interface>>
        +visitConcreteElementA(ConcreteElementA)
        +visitConcreteElementB(ConcreteElementB)
    }

    class ConcreteVisitor1 {
        +visitConcreteElementA(ConcreteElementA)
        +visitConcreteElementB(ConcreteElementB)
    }

    class Element {
        <<interface>>
        +accept(Visitor)
    }

    class ConcreteElementA {
        +accept(Visitor)
        +operationA()
    }

    class ConcreteElementB {
        +accept(Visitor)
        +operationB()
    }

    class ObjectStructure {
    }

    Visitor <|.. ConcreteVisitor1
    Element <|.. ConcreteElementA
    Element <|.. ConcreteElementB
    ObjectStructure --> Element
    `,
    roles: [
      { name: 'Visitor (抽象访问者)', mappedClass: 'Visitor', description: '为该对象结构中 ConcreteElement 的每一个类声明一个 Visit 操作。' },
      { name: 'ConcreteVisitor (具体访问者)', mappedClass: 'ConcreteVisitor1', description: '实现每个由 Visitor 声明的操作。' },
      { name: 'Element (抽象元素)', mappedClass: 'Element', description: '定义一个 Accept 操作，它以一个访问者为参数。' },
      { name: 'ConcreteElement (具体元素)', mappedClass: 'ConcreteElementA, ConcreteElementB', description: '实现 Accept 操作，该操作以一个访问者为参数。' },
      { name: 'ObjectStructure (对象结构)', mappedClass: 'ObjectStructure', description: '能枚举它的元素；可以提供一个高层的接口以允许访问者访问它的元素。' }
    ]
  }
];
