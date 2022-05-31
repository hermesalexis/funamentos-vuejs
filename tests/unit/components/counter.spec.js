import { shallowMount } from "@vue/test-utils"
import Counter from "@/components/Counter"


describe("Counter Component", () => {

  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount( Counter );
  })
/*
  test("should match with snapshot", () => {

    const wrapper = shallowMount( Counter )

    expect( wrapper.html() ).toMatchSnapshot()
  }) */

  test("h2 label should has default value 'Custom Title'", () => {
    expect( wrapper.find("h2").exists() ).toBeTruthy()

    const h2Value = wrapper.find('h2').text()

    expect( h2Value ).toBe("Custom Title")

  })

  test("p paragraph should has default value 100", () => {
    // pTags
    const pValue = wrapper.find("[data-test-id='counter']").text()

    // expect segundo p === 100
    expect( pValue ).toBe("100")
  })

  test("should increase and decrease the counter value", async() => {
    const [increaseBtn, decreaseBtn] = wrapper.findAll("button")

    await increaseBtn.trigger("click")
    await increaseBtn.trigger("click")
    await increaseBtn.trigger("click")
8
    await decreaseBtn.trigger("click")
    await decreaseBtn.trigger("click")

    const value = wrapper.find("[data-test-id='counter']").text()

    expect( value ).toBe("101")
  })

  test("should set defult value", () => {
    const { start } = wrapper.props()

    const value = wrapper.find("[data-test-id='counter']").text()

    expect( Number(value) ).toBe( start )
  })


  test("should show property title", () => {
    const title = "Pepe prueba"

    const wrapper = shallowMount( Counter, {
      props: {
        title,
        /* start: "5" */
      }
    } )

    expect( wrapper.find( "h2" ).text() ).toBe( title )
  })

})