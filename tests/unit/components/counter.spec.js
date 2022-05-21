import { shallowMount } from "@vue/test-utils"
import Counter from "@/components/Counter"


describe("Counter Component", () => {
/*
  test("should match with snapshot", () => {

    const wrapper = shallowMount( Counter )

    expect( wrapper.html() ).toMatchSnapshot()
  }) */

  test("h2 label should has default value 'Custom Title'", () => {
    const wrapper = shallowMount( Counter ) // test subject

    expect( wrapper.find("h2").exists() ).toBeTruthy()

    const h2Value = wrapper.find('h2').text()

    expect( h2Value ).toBe("Custom Title")

  })

  test("p paragraph should has default value 100", () => {
    // wrapper
    const wrapper = shallowMount( Counter ) // test subject

    // pTags
    const pValue = wrapper.find("[data-test-id='counter']").text()

    // expect segundo p === 100
    expect( pValue ).toBe("100")
  })
})