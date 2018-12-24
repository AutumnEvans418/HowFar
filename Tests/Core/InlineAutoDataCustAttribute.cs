using AutoFixture.NUnit3;

namespace Tests
{
    public class InlineAutoDataCustAttribute : InlineAutoDataAttribute
    {
        public InlineAutoDataCustAttribute(params object[] arguments) : base(AutoDataCustAttribute.GetFixture(), arguments)
        {

        }
    }
}