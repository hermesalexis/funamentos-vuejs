import { shallowMount } from "@vue/test-utils";
import Indecision from "@/components/Indecision"

describe("Indecision Component", () => {

  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount( Indecision );
  })

  test("should match with snapshot", () => {
    expect( wrapper.html() ).toMatchSnapshot()
  })
})