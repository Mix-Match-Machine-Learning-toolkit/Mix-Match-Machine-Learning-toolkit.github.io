<?xml version="1.0" encoding="UTF-8"?>

<!-- <xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"> -->
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0"
  xmlns:xlink="http://www.w3.org/1999/xlink">

  <xsl:param name="tokenselected1"></xsl:param>

  <xsl:param name="tokenselected2"></xsl:param>

  <xsl:param name="label"></xsl:param>

  <xsl:param name="learning"></xsl:param>

  <xsl:template match="/">
    <html>
      <body id='replace'>

        <!-- <xsl:for-each select=""> -->

        <xsl:choose>

          <xsl:when test="combinations/combi[datatoken=$tokenselected1 and abilitytoken=$tokenselected2]/@exist = 'no'">
            <header>
              <div class="headerData">

                <xsl:for-each select="combinations/combi[datatoken=$tokenselected1 and abilitytoken=$tokenselected2]">
                  <div class='leftheader'>
                    <div class='leftdiv'>

                      <img>

                        <xsl:attribute name="class">datacombiimage
                        </xsl:attribute>

                        <xsl:attribute name="src">
                          <xsl:value-of select="../images/im[@value=$label]"/>
                        </xsl:attribute>
                      </img>
                      <h3 class='datatoken token'>
                        <xsl:value-of select="datatype"/>
                      </h3>
                    </div>
                    <div class='rightdiv'>

                      <img>

                        <xsl:attribute name="class">abilitycombiimage
                        </xsl:attribute>

                        <xsl:attribute name="src">
                          <xsl:value-of select="../images/im[@value=$learning]"/>
                        </xsl:attribute>
                      </img>
                      <h3 class='abilitytoken token'>
                        <xsl:value-of select="ability"/>
                      </h3>

                    </div>
                  </div>
                  <div class="rightheader">
                    <h3 class='type combi'>Sorry!</h3>
                    <p class='description'>This is not a common combination and no examples currently exist on this website</p>
                    <xsl:if test="@NLP= 'yes'">
                      <p class= 'description'>The ML capability <span class='highlight combi'>
                        <xsl:value-of select="ability"/>
                      </span> works (only) with human language. So try combining it with audio or text!</p>
                  </xsl:if>
                </div>
              </xsl:for-each>
            </div>
          </header>
        </xsl:when>

        <xsl:otherwise>
          <header>
            <div class="headerData">

              <xsl:for-each select="combinations/combi[datatoken=$tokenselected1 and abilitytoken=$tokenselected2]">
                <div class='leftheadercombi'>

                  <div class='leftdivcombi'>

                    <img>

                      <xsl:attribute name="class">datacombiimage
                      </xsl:attribute>

                      <xsl:attribute name="src">
                        <xsl:value-of select="../images/im[@value=$label]"/>
                      </xsl:attribute>
                    </img>
                    <h3 class='datatoken token'>
                      <xsl:value-of select="datatype"/>
                    </h3>
                  </div>
                  <div class='middivcombi'>
                    <img>

                      <xsl:attribute name="class">abilitycombiimage
                      </xsl:attribute>

                      <xsl:attribute name="src">
                        <xsl:value-of select="../images/im[@value=$learning]"/>
                      </xsl:attribute>
                    </img>
                    <h3 class='abilitytoken token'>
                      <xsl:value-of select="ability"/>
                    </h3>
                  </div>
                </div>

                <div class='rightheadercombi'>
                  <h3 class='type combi'>
                    <xsl:value-of select="name"/>
                  </h3>
                  <p class='descriptioncombi'>
                    <xsl:value-of select="description"/>
                  </p>
                  <p class='techterms'>
                    <i class="fa-solid fa-magnifying-glass fa-lg" style="color: #1E475E;">&#160;
                    </i>
                    <span class='bold'>Technical term(s):
                    </span>

                    <span>
                      <xsl:value-of select="techterm"/>
                    </span>
                  </p>

                  <div class='outputdiv'>
                    <img>

                      <xsl:attribute name="class">connectortoken_icon
                      </xsl:attribute>

                      <xsl:attribute name="src">
                        <xsl:value-of select="../images/im[@value='connectoricon']"/>
                      </xsl:attribute>
                    </img>
                    <!-- <i class="fa-solid fa-print fa-lg" style="color: #1E475E;">&#160;</i> -->
                    <span class='bold'>&#160;Output:&#160;&#160;
                    </span>
                    <!-- <img>

                        <xsl:attribute name="class">smalloutputimage
                        </xsl:attribute>

                        <xsl:attribute name="src"><xsl:value-of select="../images/im[@value='output']"/>
                        </xsl:attribute>
                      </img> -->
                    <span class="output">
                      <xsl:value-of select="output" disable-output-escaping="yes"/>
                    </span>

                  </div>

                </div>
              </xsl:for-each>
            </div>
          </header>
          <div class="tabDiv">

            <div class="tab">
              <!-- <button class="tablinks" onclick="openTab(event, 'application')" id="defaultOpen">Application</button> -->
              <!-- <button class="tablinks" onclick="openTab(event, 'interactive')">Interactive example</button> -->
              <!-- <button class="tablinks" onclick="openTab(event, 'weka')">Weka</button> -->
            </div>

            <div id='application' class='tabcontent'>
              <xsl:choose>
                <xsl:when test="combinations/combi[datatoken=$tokenselected1 and abilitytoken=$tokenselected2]/examples/@exist = 'no'">
                  <div class='example'>
                    <p>There is no example (yet) for this combination but you could try making it yourself!</p>
                  </div>
                </xsl:when>
                <xsl:otherwise>
                  <div class='example'>
                    <xsl:for-each select="combinations/combi[datatoken=$tokenselected1 and abilitytoken=$tokenselected2]/examples/ex">
                      <!-- <div class='img_caption'> -->
                      <h3 class='exampleHeaderMobile'>
                        <xsl:value-of select="exname"/>
                      </h3>
                      <div class='exImg'>
                        <img>

                          <xsl:attribute name="src">
                            <xsl:value-of select="eximage"/>
                          </xsl:attribute>

                          <xsl:attribute name="class">exampleImage
                          </xsl:attribute>
                        </img>
                        <p class='caption'>
                          <span>&#169;	</span> Image <span>
                          <xsl:value-of select="source"/>
                        </span>
                      </p>
                    </div>

                    <!-- </div> -->
                    <div class='exText'>
                      <h3 class='exampleHeaderApplication'>
                        <xsl:value-of select="exname"/>
                      </h3>
                      <p>
                        <span class='bold'>Description:
                        </span>
                        <xsl:value-of select="exdescription"/>
                      </p>
                      <p>
                        <i class="fa-solid fa-triangle-exclamation fa-lg" style="color: #1E475E;">&#160;

                        </i>
                        <i> Please be aware that these applications have not been checked for compliance to ethical guidelines on the use of AI </i>
                      </p>
                      <p>
                        <a href="{exlink/@xlink:href}" target="_blank">

                          <xsl:attribute name="onclick">sendlinkOOCSI("examplelink","<xsl:value-of select="exlink/@xlink:href"/>
")
                          </xsl:attribute>
                            See example</a>
                      </p>
                      <p>
                        <a href="{diylink/@xlink:href}" target="_blank">

                          <xsl:attribute name="onclick">sendlinkOOCSI("diylink","<xsl:value-of select="diylink/@xlink:href"/>
")
                          </xsl:attribute>
                            Train it yourself</a>
                      </p>
                    </div>
                  </xsl:for-each>
                </div>
              </xsl:otherwise>
            </xsl:choose>
          </div>
          <div id='interactive' class='tabcontent '>
            <div id='interactiveExample'>
              <p>Sorry, there is no interactive example yet for this combination!</p>

            </div>
          </div>
          <div id='weka' class='tabcontent '  >
            <xsl:choose>
              <xsl:when test="combinations/combi[datatoken=$tokenselected1 and abilitytoken=$tokenselected2]/weka/@exist = 'no'">
                <!-- <p>It is not possible to do this kind of ML training in Weka.</p> -->
                <p>
                  <xsl:value-of select="combinations/combi[datatoken=$tokenselected1 and abilitytoken=$tokenselected2]/weka/reason"/>
                </p>
              </xsl:when>
              <xsl:otherwise>
                <div class='splitHeader'>
                  <h3 class='exampleHeader' >Instructions for Weka:</h3>

                  <a href='#' onclick="openOverlayWeka();return false;" class="" id='overlayButton'>
                    <!-- <i class="fa fa-question-circle fa-lg" style="color: #1E475E;">&#160;
                    </i>  -->
                    What is Weka?</a>

                </div>
                <div id='overlayWeka'>
                  <a href="#" onclick="closeOverlayWeka();return false;" id='closeOverlay'>X</a>
                  <div id='overlayText'>

                    <h2 class='overlay exampleheader'>Weka</h2>

                    <p class='overlay'>
                      <span class='overlay'>What is Weka?</span>
                     Weka is a program you download and run on your computer to perform data mining/machine learning tasks. It is developed by the University of Waikato and it is mainly suited 
                     for tabular data. 
                    </p>

                    <p class='overlay'>
                      <span class='overlay'>Why Weka?</span>                  
                    Weka uses a graphical user interface and you don't need any experience with programming to start training your own Machine Learning models.
                    It is therefore easy to get started with, but still allows you a lot of options to tweak models and to train more complex models. 
                    </p>
                    <p class='overlay'>
                      <span class='overlay'>First time use?</span>
                        To start using Weka, you first need to download and install the software. Instructions can be found 
                      <a class='overlay' href="https://waikato.github.io/weka-wiki/downloading_weka/" target="_blank" rel="noopener noreferrer">here</a>.
                    </p>
                    <p class='overlay'>
                     Next, you can <a class='overlay' href="https://www.cs.waikato.ac.nz/ml/weka/courses.html" target="_blank" rel="noopener noreferrer">watch</a> 
                     the first few online video lectures developed by The University of Waikato in which they explain how to use Weka. These will help you to understand the interface.
                     Afterwards, you can use the instructions shown in the "Weka" tabs in the combination pages to create a model with similar functionalities as the examples.
                    </p>
                  </div>
                </div>
                <ol class="checkList">
                  <li class='check-off'>Open the explorer</li>
                  <xsl:for-each select="combinations/combi[datatoken=$tokenselected1 and abilitytoken=$tokenselected2]/weka/instructions/*">
                    <li class='check-off'>
                      <xsl:value-of select="@value"/>
                    </li>
                  </xsl:for-each>
                </ol>
              </xsl:otherwise>
            </xsl:choose>
          </div>
          <!-- </xsl:otherwise>
          </xsl:choose> -->
        </div>
      </xsl:otherwise>
    </xsl:choose>

  </body>
  <footer></footer>
</html>
</xsl:template>

</xsl:stylesheet>