// Візьміть декоратор DeprecatedMethod і навчіть його працювати з об'єктом,
// який вміє приймати причину, через яку його не варто використовувати, і назву методу, 
// яким його можна замінити, якщо це можливо.


// Декоратор DeprecatedMethod для методів
function DeprecatedMethod(reason: string, replacement?: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      console.warn(`[Deprecated] ${propertyKey} is deprecated. Reason: ${reason}`);
      if (replacement) {
        console.warn(`You can use ${replacement} instead.`);
      }
      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}


// Декоратор MinLength
function MinLength(min: number) {
  return function (target: any, propertyKey: string) {
    let value: any;

    const get = function () {
      return value;
    };

    const set = function (newValue: any) {
      if (newValue.length < min) {
        throw new Error(`${propertyKey} should have a minimum length of ${min}`);
      }
      value = newValue;
    };

    Object.defineProperty(target, propertyKey, {
      get: get,
      set: set,
      enumerable: true,
      configurable: true,
    });
  };
}

// Декоратор MaxLength
function MaxLength(max: number) {
  return function (target: any, propertyKey: string) {
    let value: any;

    const get = function () {
      return value;
    };

    const set = function (newValue: any) {
      if (newValue.length > max) {
        throw new Error(`${propertyKey} should have a maximum length of ${max}`);
      }
      value = newValue;
    };

    Object.defineProperty(target, propertyKey, {
      get: get,
      set: set,
      enumerable: true,
      configurable: true,
    });
  };
}

// Декоратор Email
function Email(target: any, propertyKey: string) {
  let value: any;

  const get = function () {
    return value;
  };

  const set = function (newValue: any) {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    if (!emailRegex.test(newValue)) {
      throw new Error(`${propertyKey} should be a valid email address`);
    }
    value = newValue;
  };

  Object.defineProperty(target, propertyKey, {
    get: get,
    set: set,
    enumerable: true,
    configurable: true,
  });
}

class User {
  @DeprecatedMethod("This method is no longer supported.", "newMethod")
  oldMethod() {
    console.log("Old method called.");
  }

  @MinLength(5)
  username: string;

  @MaxLength(10)
  description: string;

  @Email
  email: string;

  constructor(username: string, description: string, email: string) {
    this.username = username;
    this.description = description;
    this.email = email;
  }
}

  
  const user = new User("valya_diachenko", "Lorem ipsum", "valya@example.com");
  user.oldMethod(); 
  user.username = "a";
  user.description = "This is a long description"; 
  user.email = "invalid-email"; 



