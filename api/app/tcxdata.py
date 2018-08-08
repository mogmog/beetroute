def data():
    return """<?xml version='1.0' encoding='UTF-8'?>
        <TrainingCenterDatabase xmlns:ns2="http://www.garmin.com/xmlschemas/UserProfile/v2"
            xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xmlns:ns4="http://www.garmin.com/xmlschemas/ProfileExtension/v1"
            xmlns:ns5="http://www.garmin.com/xmlschemas/ActivityGoals/v1"
            xmlns:tpx="http://www.garmin.com/xmlschemas/ActivityExtension/v2"
            xmlns="http://www.garmin.com/xmlschemas/TrainingCenterDatabase/v2">
          <Activities>
            <Activity Sport="Running">
              <Notes>Sunday Morning Run</Notes>
              <Id>2009-08-30T13:41:31.000Z</Id>
              <Lap StartTime="2009-08-30T13:41:31.000Z">
                <TotalTimeSeconds>2678.0</TotalTimeSeconds>
                <DistanceMeters>6164.9</DistanceMeters>
                <MaximumSpeed>8.7</MaximumSpeed>
                <Calories>530</Calories>
                <AverageHeartRateBpm>
                  <Value>179</Value>
                </AverageHeartRateBpm>
                <MaximumHeartRateBpm>
                  <Value>206</Value>
                </MaximumHeartRateBpm>
                <Intensity>Active</Intensity>
                <TriggerMethod>Manual</TriggerMethod>
                <Track>
                  <Trackpoint>
                    <Time>2009-08-30T13:41:31.000Z</Time>
                    <Position>
                      <LatitudeDegrees>38.925836</LatitudeDegrees>
                      <LongitudeDegrees>-77.02924</LongitudeDegrees>
                    </Position>
                    <AltitudeMeters>55.8</AltitudeMeters>
                    <HeartRateBpm xsi:type="HeartRateInBeatsPerMinute_t">
                      <Value>95</Value>
                    </HeartRateBpm>
                  </Trackpoint>
                  <Trackpoint>
                    <Time>2009-08-30T13:41:33.000Z</Time>
                    <Position>
                      <LatitudeDegrees>38.925828</LatitudeDegrees>
                      <LongitudeDegrees>-77.0293</LongitudeDegrees>
                    </Position>
                    <AltitudeMeters>55.9</AltitudeMeters>
                    <HeartRateBpm xsi:type="HeartRateInBeatsPerMinute_t">
                      <Value>95</Value>
                    </HeartRateBpm>
                  </Trackpoint>
                  <Trackpoint>
                    <Time>2009-08-30T13:41:35.000Z</Time>
                    <Position>
                      <LatitudeDegrees>38.925813</LatitudeDegrees>
                      <LongitudeDegrees>-77.029404</LongitudeDegrees>
                    </Position>
                    <AltitudeMeters>55.8</AltitudeMeters>
                    <HeartRateBpm xsi:type="HeartRateInBeatsPerMinute_t">
                      <Value>100</Value>
                    </HeartRateBpm>
                  </Trackpoint>
                </Track>
                <Extensions>
                  <LX xmlns="http://www.garmin.com/xmlschemas/ActivityExtension/v2">
                    <AvgSpeed>3.051930693069307</AvgSpeed>
                  </LX>
                </Extensions>
              </Lap>
            </Activity>
          </Activities>
          <Author xsi:type="Application_t">
            <Name>tapiriik</Name>
            <Build>
              <Version>
                <VersionMajor>0</VersionMajor>
                <VersionMinor>0</VersionMinor>
                <BuildMajor>0</BuildMajor>
                <BuildMinor>0</BuildMinor>
              </Version>
            </Build>
            <LangID>en</LangID>
            <PartNumber>000-00000-00</PartNumber>
          </Author>
        </TrainingCenterDatabase>"""
