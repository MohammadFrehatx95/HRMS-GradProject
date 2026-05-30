using System;
using System.Reflection;
using System.Linq;
using Fido2NetLib;

class Program
{
    static void Main()
    {
        var type = typeof(IFido2);
        foreach (var method in type.GetMethods())
        {
            var parameters = string.Join(", ", method.GetParameters().Select(p => p.ParameterType.Name + " " + p.Name));
            Console.WriteLine($"{method.ReturnType.Name} {method.Name}({parameters})");
        }
    }
}
