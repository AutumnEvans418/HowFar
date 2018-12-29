using AutoFixture.NUnit3;

namespace Tests.Core
{
    public class InlineAutoDataCustAttribute : InlineAutoDataAttribute
    {
        public InlineAutoDataCustAttribute(params object[] arguments) : base(AutoDataCustAttribute.GetFixture(), arguments)
        {

        }
    }
}